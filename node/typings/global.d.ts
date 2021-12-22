interface Settings {
  fullCatalogImport: boolean
  listrakToken: ListrakToken
  listrakId?: string
  listrakSecret?: string
  fields?: Fields
}

interface Fields {
  category?: string
  subcategory?: string
  meta1?: string
  meta2?: string
  meta3?: string 
}
interface DefaultSettings extends Settings {
  listrakToken: ListrakToken | null
}

interface ListrakToken {
  access_token: string
  token_type: string
  expires_in: number
}
