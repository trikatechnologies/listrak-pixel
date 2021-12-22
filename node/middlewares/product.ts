import { APP } from '@vtex/api'

const getGender = ({ ProductSpecifications }: Product) => {
  const genderSpec = ProductSpecifications.find(
    spec => spec.FieldName === 'Gender'
  )

  if (!genderSpec) return 'N'

  return genderSpec.FieldValues.includes('Womens') ? 'W' : 'M'
}

const onSale = ({ ProductSpecifications }: Product) => {
  const saleSpec = ProductSpecifications.find(
    spec => spec.FieldName === 'On Sale'
  )

  if (!saleSpec) return false

  const [value] = saleSpec.FieldValues

  return value === 'True'
}

const getSpecification = (
  SkuSpecifications: Specification[],
  specName: string
) => {
  const specifications = SkuSpecifications.find(
    spec => spec.FieldName === specName
  )

  if (!specifications) return ''

  return specifications.FieldValues[0]
}

const getUniqueSpecifications = (SkuSpecifications: Specification[]) => {
  const uniqueSpecs = SkuSpecifications.filter(
    spec => !['Color', 'Size'].includes(spec.FieldName)
  )

  if (!uniqueSpecs) return ''

  return uniqueSpecs
    .map(i => `${i.FieldName}: ${i.FieldValues.join()}`)
    .join(' | ')
}

const buildListrakProduct = (sku: Product, stock: StockItem, settings: Settings) => {
  const categoryValue = sku.ProductCategories[Object.keys(sku.ProductCategories).pop() as string]
  const metaValue = getUniqueSpecifications(sku.SkuSpecifications)
  return {
    brand: sku.BrandName,
    description: sku.ProductDescription,
    imageUrl: sku.ImageUrl,
    isViewable: sku.ProductIsVisible,
    masterSku: sku.ProductRefId,
    qoh: stock.quantity,
    sku: sku.Id,
    title: sku.ProductName,
    discontinued: sku.isActive === 'false',
    inStock: stock.quantity > 0,
    isPurchasable: stock.availability === 'available',
    linkUrl: sku.DetailUrl,
    price: stock.listPrice / 100,
    salePrice: stock.price / 100,
    category: settings.fields?.category ? getSpecification(sku.ProductSpecifications, settings.fields?.category ) : categoryValue,
    gender: getGender(sku),
    onSale: onSale(sku),
    subCategory: getSpecification(sku.ProductSpecifications, settings.fields?.subcategory || 'Type/Silhouette'),
    color: getSpecification(sku.SkuSpecifications, 'Size'),
    size: getSpecification(sku.SkuSpecifications, 'Color'),
    meta1: settings.fields?.meta1 ? getSpecification(sku.ProductSpecifications, settings.fields?.meta1 ) : metaValue ,
    meta2: getSpecification(sku.ProductSpecifications, settings.fields?.meta2 || 'meta_2'),
    meta3: getSpecification(sku.ProductSpecifications, settings.fields?.meta3 || 'meta_3' )
  }
}

export async function productHandler(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const {
    body: { id },
    clients: { catalog, fulfillment, listrak, broadcaster, apps },
    state: { appSettings },
    vtex: { logger },
  } = ctx

  if (appSettings.fullCatalogImport) {
    try {
      await broadcaster.sendCatalogNotifications()
    } catch (error) {
      logger.error({
        error,
        message: 'ProductHandler-FullCatalogImportError',
      })
    }

    appSettings.fullCatalogImport = false
    await apps.saveAppSettings(APP.ID, appSettings)
  }

  logger.info({
    message: 'ProductHandler-eventReceived',
    data: ctx.body,
  })

  let response: { sku: Product; stockResponse: Stock } | undefined
  try {
    const sku = await catalog.getProductDetail(id)
    const stockResponse = await fulfillment.getStockData(id)

    response = { sku, stockResponse }
  } catch (error) {
    logger.error({
      error,
      message: 'ProductHandler-getSkuDetailError',
      data: { skuId: id },
    })

    return
  }

  const { sku, stockResponse } = response
  let listrakProduct: ListrakProduct | undefined

  if (sku && stockResponse.items.length) {
    const [stock] = stockResponse.items

    try {
      listrakProduct = buildListrakProduct(sku, stock, appSettings)
    } catch (error) {
      logger.error({
        error,
        message: 'ProductHandler-buildProductError',
        data: { sku, stock },
      })

      return
    }

    try {
      await listrak.createProduct(
        appSettings.listrakToken.access_token,
        listrakProduct
      )
    } catch (error) {
      logger.error({
        error,
        message: 'ProductHandler-createProductError',
        data: { listrakProduct },
      })

      return
    }
  }

  await next()
}
