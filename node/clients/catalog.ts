import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'

export default class Catalog extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`http://${context.account}.vtexcommercestable.com.br`, context, {
      ...options,
    })
  }

  public async getProductDetail(skuId: string): Promise<Product> {
    return this.http.get(
      `/api/catalog_system/pvt/sku/stockkeepingunitbyid/${skuId}`,
      {
        headers: {
          VtexIdclientAutCookie: this.context.authToken,
        },
        metric: 'category-get',
      }
    )
  }
}
