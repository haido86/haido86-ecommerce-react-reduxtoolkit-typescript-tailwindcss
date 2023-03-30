// import { setNotification } from './../../components/notification/notificationSlice'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Product } from '../../type'

type ProductState = {
  isLoading: boolean
  error: null | string
  items: Product[]
  filteredProductArr: Product[]
}

const initialState: ProductState = {
  isLoading: false,
  error: null,
  items: [],
  filteredProductArr: []
}

export const fetchProductsThunk = createAsyncThunk('products/fetch', async () => {
  const res = await fetch('http://localhost:5173/data/products.json')
  const products = await res.json()
  return products
})

export const addProductThunk = createAsyncThunk(
  'products/add-product',
  async (newProduct: Product) => {
    return newProduct
  }
)
export const updateProductThunk = createAsyncThunk(
  'products/update-product',
  async (updatedProduct: Product) => {
    return updatedProduct
  }
)

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    filteredProductsAction(state, action) {
      const filteredProducts = state.items.filter(
        (item) =>
          item.title.toLowerCase().includes(action.payload.toLowerCase()) ||
          item.category.toLowerCase() === action.payload.toLowerCase()
      )
      return {
        ...state,
        filteredProductArr: action.payload.length > 0 ? filteredProducts : [...state.items]
      }
    },
    removeProduct(state, action) {
      const removedItem = state.items.find((item) => item.id == action.payload)
      if (removedItem) {
        state.items = state.items.filter((item) => item.id !== +action.payload)
      }
    }
  },
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
    builder.addCase(addProductThunk.fulfilled, (state, action) => {
      state.isLoading = false
      state.items = [action.payload, ...state.items]
    })
    builder.addCase(updateProductThunk.fulfilled, (state, action) => {
      const updatedProducts = state.items.map((item) => {
        if (item.id === +action.payload.id) {
          return action.payload
        }
        return item
      })
      state.isLoading = false
      state.items = updatedProducts
    })
  }
})
export const { filteredProductsAction, removeProduct } = productsSlice.actions

export default productsSlice.reducer
