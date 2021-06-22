import { APP } from '@vtex/api'

const DEFAULT_SETTINGS: DefaultSettings = {
  fullCatalogImport: false,
  listrakToken: null,
}

export async function withSettings(ctx: Context, next: () => Promise<unknown>) {
  const {
    clients: { apps, listrakAuth },
    vtex: { logger },
  } = ctx

  const appSettings = (await apps.getAppSettings(APP.ID)) as Settings
  const settings = { ...DEFAULT_SETTINGS, ...appSettings }
  const { listrakToken, listrakId, listrakSecret } = settings

  if (!listrakId || !listrakSecret) {
    logger.info({
      error: 'Missing Listrak credentials',
      message: 'ListrakSettings-settings',
    })

    return
  }

  const invalidToken = !listrakToken || listrakToken.expires_in < Date.now()

  if (invalidToken) {
    try {
      const token = await listrakAuth.getToken(listrakId, listrakSecret)

      if (!token) {
        throw new Error('No listrak token returned')
      }

      settings.listrakToken = token
      settings.listrakToken.expires_in =
        Date.now() + (token.expires_in - 5) * 1000
      await apps.saveAppSettings(APP.ID, settings)
    } catch (error) {
      logger.error({
        error,
        message: 'ListrakSettings-tokenError',
      })

      return
    }
  }

  ctx.state.appSettings = settings

  await next()
}
