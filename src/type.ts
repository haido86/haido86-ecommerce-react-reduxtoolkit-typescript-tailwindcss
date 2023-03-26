export type User = {
  id: number
  role: string
  firstName: string
  lastName: string
  email: string
  password: string
}

export type Product = {
  id: number
  title: string
  price: number
  description: string
  category?: string
  image?: string
  rating?: { rate: number; count: number }
}

export type Order = {
  orderId: number
  userId: number
  productId: number
  amount: number
  purchaseAt: string
}