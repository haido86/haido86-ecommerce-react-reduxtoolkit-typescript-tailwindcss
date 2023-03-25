export type User = {
  id: number
  role: string
  email: string
  password: string
}

export type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: { rate: number; count: number }
}
