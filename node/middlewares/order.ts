const ORDER_STATUS = {
  canceled: 'Canceled',
  invoiced: 'Shipped',
} as const

const bundledTotal = (items: OrderItem[]) => {
  let total = 0

  for (const item of items) {
    for (const bundleItem of item.bundleItems) {
      total += bundleItem.price / 100
    }
  }

  return total
}

const getStatus = (order: Order) => {
  const status = ORDER_STATUS[order.status as keyof typeof ORDER_STATUS]
  return status || 'Processing'
}

const getTotal = (id: string, order: Order) => {
  const itemsTotal = order.totals.find(total => total.id === id)

  return itemsTotal ? itemsTotal.value / 100 : 0
}

const totalCustomTax = (order: Order) => {
  const total = order.totals.reduce((prev: number, cur) => {
    if (cur.id !== 'CustomTax') {
      return prev
    }

    return prev + cur.value
  }, 0)

  return total ? total / 100 : 0
}

const buildListrakOrder = (order: Order): ListrakOrder => {
  const shippingAddress: ShippingAddress = {
    zipCode: order.shippingData.address.postalCode,
    address1: order.shippingData.address.street,
    city: order.shippingData.address.city,
    country: order.shippingData.address.country,
    state: order.shippingData.address.state,
  }

  const items: ListrakOrderItem[] = order.items.map(item => {
    return {
      discountedPrice: item.price / 100,
      itemTotal: (item.listPrice * item.quantity) / 100,
      itemDiscountTotal: ((item.listPrice - item.price) * item.quantity) / 100,
      orderNumber: order.sequence,
      price: item.listPrice / 100,
      quantity: item.quantity,
      sku: item.id,
    }
  })

  const [shipping] = order.shippingData.logisticsInfo

  return {
    couponCode: order.marketingData?.coupon ?? '',
    customerNumber: order.clientProfileData.userProfileId ?? '',
    dateEntered: order.creationDate,
    email: order.clientProfileData.email,
    items,
    itemTotal: getTotal('Items', order),
    merchandiseDiscount: Math.abs(getTotal('Discounts', order)),
    nonMerchandiseDiscount: (shipping.listPrice - shipping.price) / 100,
    orderNumber: order.sequence,
    orderTotal: order.value / 100,
    shipDate: order.invoicedDate ?? '',
    shippingAddress,
    shippingTotal: getTotal('Shipping', order),
    handlingTotal: bundledTotal(order.items),
    status: getStatus(order),
    taxTotal: getTotal('Tax', order) + totalCustomTax(order),
  }
}

export async function orderHandler(ctx: Context, next: () => Promise<unknown>) {
  const {
    clients: { listrak, orders },
    vtex: { logger },
    state: {
      appSettings: { listrakToken },
    },
    body,
  } = ctx

  logger.info({
    message: 'OrderHandler-eventReceived',
    data: ctx.body,
  })

  let order: Order

  try {
    order = await orders.getOrder(body.orderId)

    if (!order || !order.status || !order.items) {
      return
    }
  } catch (error) {
    logger.error({
      error,
      message: 'OrderHandler-getOrderError',
      data: ctx.body,
    })

    return
  }

  let listrakOrder: ListrakOrder | undefined
  let listrakCustomer: ListrakCustomer | undefined

  try {
    listrakOrder = buildListrakOrder(order)
    listrakCustomer = {
      email: order.clientProfileData.email,
      firstName: order.clientProfileData.firstName,
      lastName: order.clientProfileData.lastName,
    }
  } catch (error) {
    logger.error({
      error,
      message: 'OrderHandler-buildListrakOrderError',
      data: { order },
    })

    return
  }

  const { access_token: token } = listrakToken

  try {
    await listrak.createOrder(token, listrakOrder)

    if (order.status === 'on-order-completed') {
      await listrak.createCustomer(token, listrakCustomer)

      logger.info({
        message: 'OrderHandler-createCustomer',
        data: { listrakCustomer },
      })
    }
  } catch (error) {
    logger.error({
      error,
      message: 'OrderHandler-createOrderError',
      data: { listrakOrder, listrakCustomer },
    })
  }

  await next()
}
