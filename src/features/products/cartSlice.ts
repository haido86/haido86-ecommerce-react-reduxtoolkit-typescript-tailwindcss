import { Product } from './../../type'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

type CartState = {
  isLoading: boolean
  error: string
  data: Product[]
}
const initialState: CartState = {
  isLoading: false,
  error: '',
  data: []
}

export const addToCartThunk = createAsyncThunk('cart/addtocart', async ({ id }: { id: number }) => {
  const res = await fetch('http://localhost:5173/data/products.json')
  const products = await res.json()
  const findProductById = products.find((product: Product) => product.id === id)

  return findProductById
})

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCartThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addToCartThunk.rejected, (state) => {
      state.error = 'something went wrong'
      state.isLoading = false
    })
    builder.addCase(addToCartThunk.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = [...state.data, action.payload]
    })
  }
})

export default cartSlice.reducer
