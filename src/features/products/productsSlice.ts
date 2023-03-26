import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Product } from '../../type'

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

const newProduct = {
  id: 21,
  title: 'Wyte trousers',
  price: 24,
  description: 'Material: cotton'
}

export const addNew = createAsyncThunk('products/addnew', async () => {
  const res = await fetch('http://localhost:5173/data/products.json')
  let products = await res.json()
  console.log('this is needed')

  products = [...products, newProduct]
  console.log('productsarray', products)

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
    builder.addCase(addNew.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addNew.rejected, (state) => {
      state.error = 'something went wrong'
      state.isLoading = false
    })
    builder.addCase(addNew.fulfilled, (state, action) => {
      state.isLoading = false
      state.items = action.payload
    })
  }
})

export default productsSlice.reducer
