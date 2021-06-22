import { TooManyRequestsError } from '@vtex/api'

const MAX_REQUEST = 10
let COUNTER = 0

export async function throttle(ctx: Context, next: () => Promise<unknown>) {
  const {
    vtex: { logger },
  } = ctx

  COUNTER++

  try {
    if (COUNTER > MAX_REQUEST) {
      logger.warn({
        message: 'Listrak-Throttled',
        counter: COUNTER,
        data: ctx.body,
      })
      throw new TooManyRequestsError()
    }

    await next()
  } finally {
    COUNTER--
  }
}
