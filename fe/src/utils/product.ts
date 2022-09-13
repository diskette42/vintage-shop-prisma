export interface ProductInput {
  name: string
  price: number
  description: string
  image: string
}

export interface ProductList {
  id: number
  name: string
  price: number
  description: string
  image: string
  isOnStock: boolean
}

export interface ProductItem {
  id: number
  quantity: number
  name: string
  price: number
  description: string
  image: string
}
