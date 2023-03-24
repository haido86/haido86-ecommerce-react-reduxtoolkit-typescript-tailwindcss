import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: { rate: number; count: number }
}

type ProductState = {
  isLoading: boolean
  error: null | string
  items: Product[]
}

const initialState: ProductState = {
  isLoading: false,
  error: null,
  items: []
}

export const fetchProductsThunk = createAsyncThunk('products/fetch', async (keyword: string) => {
  const res = await fetch('http://localhost:5173/data/products.json')
  let products = await res.json()

  if (keyword.length > 0) {
    products = products.filter((product: { title: string }) =>
      product.title.toLowerCase().includes(keyword.toLowerCase())
    )
  }

  return products
})

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchProductsThunk.rejected, (state) => {
      state.error = 'something went wrong'
      state.isLoading = false
    })
    builder.addCase(fetchProductsThunk.fulfilled, (state, action) => {
      state.isLoading = false
      state.items = action.payload
    })
  }
})

export default productsSlice.reducer
