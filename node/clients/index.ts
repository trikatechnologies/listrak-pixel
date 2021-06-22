import { IOClients } from '@vtex/api'

import Broadcaster from './broadcaster'
import Catalog from './catalog'
import Fulfillment from './fulfillment'
import Listrak, { ListrakAuth } from './listrak'
import OrdersClient from './orders'

export class Clients extends IOClients {
  public get broadcaster() {
    return this.getOrSet('broadcaster', Broadcaster)
  }

  public get orders() {
    return this.getOrSet('orders', OrdersClient)
  }

  public get fulfillment() {
    return this.getOrSet('fulfillment', Fulfillment)
  }

  public get catalog() {
    return this.getOrSet('catalog', Catalog)
  }

  public get listrak() {
    return this.getOrSet('listrak', Listrak)
  }

  public get listrakAuth() {
    return this.getOrSet('listrakAuth', ListrakAuth)
  }
}
