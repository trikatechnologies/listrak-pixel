interface Window extends Window {
  dataLayer: any[]
  __listrak_merchant_id: string
  __listrak_pref_center: string
  __listrak_email_ids: string[]
  __listrak_subscription_point: string
  __listrak_subscription_ids: Array<{ input: string; submit: string }>
  __listrak_useRefIdSetting: boolean
}

interface HTMLElement extends HTMLElement {
  ltkAsyncProperty: any
  attachEvent(_: any, __: any): any
}
