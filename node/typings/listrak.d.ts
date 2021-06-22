interface ListrakResponse {
  status: number
  resourceId: string
}

interface ListrakProduct {
  alternateImagesType1?: AlternateImage[]
  alternateImagesType2?: AlternateImage[]
  alternateImagesType3?: AlternateImage[]
  brand?: string
  category?: string
  color?: string
  description?: string
  discontinued?: boolean
  gender?: string
  imageUrl?: string
  inStock?: boolean
  isClearance?: boolean
  isOutlet?: boolean
  isPurchasable?: boolean
  isViewable?: boolean
  linkUrl?: string
  masterSku?: string
  meta1?: string
  meta2?: string
  meta3?: string
  meta4?: string
  meta5?: string
  msrp?: number
  onSale?: boolean
  price?: number
  qoh?: number
  relatedProducts?: RelatedProduct[]
  reviewProductID?: string
  reviewURL?: string
  saleEndDate?: string
  salePrice?: number
  saleStartDate?: string
  size?: string
  sku: string
  style?: string
  subCategory?: string
  title?: string
  unitCost?: number
}

interface AlternateImage {
  rank: number
  url: string
}

interface RelatedProduct {
  rank: number
  sku: string
  type: string
}

interface ListrakOrder {
  associateID?: string
  billingAddress?: BillingAddress
  couponCode?: string
  customerNumber?: string
  dateEntered?: string
  discountTotal?: number
  email?: string
  handlingTotal?: number
  items?: ListrakOrderItem[]
  itemTotal?: number
  merchandiseDiscount?: number
  merchandiseDiscountDescription?: string
  merchandiseDiscountType?: ListrakDiscount
  meta1?: string
  meta2?: string
  meta3?: string
  meta4?: string
  meta5?: string
  nonMerchandiseDiscount?: number
  nonMerchandiseDiscountDescription?: string
  nonMerchandiseDiscountType?: ListrakDiscount
  orderNumber: string
  orderTotal?: number
  shipDate?: string
  shippingAddress?: ShippingAddress
  shippingMethod?: string
  shippingTotal?: number
  source?: string
  status?: ListrakOrderStatus
  storeNumber?: string
  taxTotal?: number
  trackingNumber?: string
}

interface ShippingAddress {
  firstName?: string
  lastName?: string
  phone?: string
  zipCode?: string
  address1: string
  address2?: string
  address3?: string
  city?: string
  country?: string
  state?: string
}

interface BillingAddress extends ShippingAddress {
  mobilePhone?: string
}

interface ListrakOrderItem {
  discountDescription?: string
  discountType?: ListrakDiscount
  discountedPrice?: number
  itemTotal?: number
  itemDiscountTotal?: number
  meta1?: string
  meta2?: string
  meta3?: string
  meta4?: string
  meta5?: string
  orderNumber?: string
  price?: number
  quantity?: number
  shipDate?: string
  shippingMethod?: string
  sku: string
  status?: ListrakOrderStatus
  trackingNumber?: string
}

interface ListrakCustomer {
  address?: {}
  birthday?: string
  customerNumber?: string
  email: string
  firstName?: string
  gender?: string
  homePhone?: string
  lastName?: string
  loyalty?: {}
  meta1?: string
  meta2?: string
  meta3?: string
  meta4?: string
  meta5?: string
  mobilePhone?: string
  preferredStoreNumber?: string
  registered?: true
  social?: {}
  workPhone?: string
  zipCode?: string
}

type ListrakDiscount =
  | 'NotSet'
  | 'PriceOverride'
  | 'PriceRule'
  | 'Promotion'
  | 'SeniorCitizen'
  | 'Markdown'
  | 'Coupon'
  | 'QuantityDiscount'
  | 'Rebate'
  | 'CashDiscount'
  | 'TradeDiscount'
  | 'TradeInKind'
  | 'PromptPaymentDiscount'
  | 'GeneralDiscount'
  | 'GiftVoucher'
  | 'FlexibleDiscount'
  | 'RewardProgram'
  | 'ManufacturerReward'
  | 'CreditCardReward'

type ListrakOrderStatus =
  | 'NotSet'
  | 'Misc'
  | 'PreOrder'
  | 'BackOrder'
  | 'Pending'
  | 'Hold'
  | 'Processing'
  | 'Shipped'
  | 'Completed'
  | 'Returned'
  | 'Canceled'
  | 'Unknown'
  | 'Closed'
