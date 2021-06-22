import { stringify } from 'querystring'

import { InstanceOptions, IOContext, ExternalClient } from '@vtex/api'

export default class Listrak extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('http://api.listrak.com/data/v1', context, {
      ...options,
      timeout: 10000,
    })
  }

  public async createOrder(
    token: string,
    order: ListrakOrder
  ): Promise<ListrakResponse> {
    return this.http.post(`/order`, order, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': `application/json`,
        'X-Vtex-Use-Https': 'true',
      },
      metric: 'listrak-order',
    })
  }

  public async createCustomer(
    token: string,
    customer: ListrakCustomer
  ): Promise<ListrakResponse> {
    return this.http.post(`/customer`, customer, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': `application/json`,
        'X-Vtex-Use-Https': 'true',
      },
      metric: 'listrak-customer',
    })
  }

  public async createProduct(
    token: string,
    product: ListrakProduct
  ): Promise<ListrakResponse> {
    return this.http.post(`/product`, product, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': `application/json`,
        'X-Vtex-Use-Https': 'true',
      },
      metric: 'listrak-product',
    })
  }
}

export class ListrakAuth extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('http://auth.listrak.com', context, {
      ...options,
      timeout: 10000,
    })
  }

  public async getToken(
    listrakId: string,
    listrakSecret: string
  ): Promise<ListrakToken> {
    return this.http.post(
      `/OAuth2/Token`,
      stringify({
        grant_type: 'client_credentials',
        client_id: `${listrakId}`,
        client_secret: `${listrakSecret}`,
      }),
      {
        headers: {
          'Content-Type': `application/x-www-form-urlencoded`,
          'X-Vtex-Use-Https': 'true',
        },
        metric: 'listrak-token',
      }
    )
  }
}
