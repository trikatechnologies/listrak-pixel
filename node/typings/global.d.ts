interface Settings {
  fullCatalogImport: boolean
  listrakToken: ListrakToken
  listrakId?: string
  listrakSecret?: string
}

interface DefaultSettings extends Settings {
  listrakToken: ListrakToken | null
}

interface ListrakToken {
  access_token: string
  token_type: string
  expires_in: number
}
