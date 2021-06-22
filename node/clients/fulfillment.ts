import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'

export default class Fulfillment extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      `http://${context.account}.vtexcommercestable.com.br`,
      context,
      options
    )
  }

  public async getStockData(skuId: string): Promise<Stock> {
    return this.http.post(
      `/api/fulfillment/pvt/orderForms/simulation?sc=1`,
      {
        items: [
          {
            id: skuId,
            quantity: 1,
            seller: '1',
          },
        ],
      },
      {
        headers: {
          VtexIdclientAutCookie: this.context.authToken,
        },

        metric: 'fulfillment-post',
      }
    )
  }
}
