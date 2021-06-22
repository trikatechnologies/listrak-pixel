import {
  ClientsConfig,
  RecorderState,
  LRUCache,
  Service,
  EventContext,
  Cached,
} from '@vtex/api'

import { Clients } from './clients'
import { productHandler } from './middlewares/product'
import { orderHandler } from './middlewares/order'
import { throttle } from './middlewares/throttle'
import { withSettings } from './middlewares/appSettings'

const TIMEOUT_MS = 3000

const memoryCache = new LRUCache<string, Cached>({ max: 5000 })

metrics.trackCache('status', memoryCache)

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    status: {
      memoryCache,
    },
  },
}

declare global {
  type Context = EventContext<Clients, State>

  interface State extends RecorderState {
    appSettings: Settings
  }
}

export default new Service({
  clients,
  graphql: {
    resolvers: {
      Mutation: {},
    },
  },
  events: {
    broadcasterCatalog: [withSettings, throttle, productHandler],
    broadcasterOrder: [withSettings, orderHandler],
  },
})
