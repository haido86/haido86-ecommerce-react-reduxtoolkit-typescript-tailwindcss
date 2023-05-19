export type User = {
  id: number
  role: Role
  username: string
}

export type Category = {
  id: number
  name: string
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export type Inventory = {
  id: number
  quantity: number
}

export type Product = {
  id: number
  title: string
  price: number
  description: string
  category: Category
  image: string
  inventory: Inventory
}

export type ProductRequest = {
  id: number
  productDTO: {
    categoryId: number
    price: number
    title: string
    description: string
    image: string
  }
  quantity: number
}

export type Order = {
  orderId: number
  userId: number
  productId: number
  amount: number
  purchaseAt: string
}

export type OrderAmount = { orderAmount: number }
export type ItemInCart = Product & OrderAmount

export type CategoryOption = { value: string; label: string }
