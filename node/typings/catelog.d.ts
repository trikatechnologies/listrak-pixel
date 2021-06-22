interface Product {
  [name: string]: any
  SkuSpecifications: Specification[]
  ProductSpecifications: Specification[]
}

interface Specification {
  FieldId: string
  FieldName: string
  FieldValueIds: number[]
  FieldValues: string[]
  IsFilter: boolean
  FieldGroupId: number
  FieldGroupName: string
}

interface Stock {
  [name: string]: any
  items: StockItem[]
}

interface StockItem {
  [name: string]: any
}
