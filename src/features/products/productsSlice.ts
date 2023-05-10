import { Category } from './../../type'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { Product } from '../../type'

type ProductState = {
  isLoading: boolean
  error: null | string
  items: Product[]
  filteredProductArr: Product[]
  item: null | Product
  categories: Category[]
  selectedCategory: null | Category
}

const initialState: ProductState = {
  isLoading: false,
  error: null,
  items: [],
  filteredProductArr: [],
  item: null,
  categories: [],
  selectedCategory: null
}

export const fetchProductsThunk = createAsyncThunk('products/fetch', async () => {
  const res = await axios.get('http://localhost:8080/api/v1/products')
  const products = await res.data
  return products
})

export const findProductByIdThunk = createAsyncThunk(
  'products/find-product',
  async (id: number) => {
    const res = await axios.get(`http://localhost:8080/api/v1/products/${id}`)
    const product = await res.data
    return product
  }
)

export const addProductThunk = createAsyncThunk(
  'products/add-product',
  async (newProduct: Partial<Product>) => {
    const res = await axios.post('http://localhost:8080/api/v1/products')
    const addedProduct = res.data
    console.log('newProduct', newProduct)
    console.log('addedProduct', addedProduct)

    // return addedProduct
  }
)
export const updateProductThunk = createAsyncThunk(
  'products/update-product',
  async (updatedProduct: Product) => {
    return updatedProduct
  }
)

export const fetchCategoriesThunk = createAsyncThunk('categories/fetch', async () => {
  const res = await axios.get('http://localhost:8080/api/v1/categories')
  const categories = await res.data
  return categories
})

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    filteredProductsAction(state, action) {
      const filteredProducts = state.items.filter(
        (item) =>
          item.title.toLowerCase().includes(action.payload.toLowerCase()) ||
          item.category.name.toLowerCase() === action.payload.toLowerCase()
      )
      const selectedCategory =
        state.categories.find((item) => item.name.toLowerCase() === action.payload.toLowerCase()) ||
        null
      return {
        ...state,
        filteredProductArr: action.payload.length > 0 ? filteredProducts : [...state.items],
        selectedCategory: selectedCategory
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
    builder.addCase(findProductByIdThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(findProductByIdThunk.rejected, (state) => {
      state.error = 'something went wrong'
      state.isLoading = false
    })
    builder.addCase(findProductByIdThunk.fulfilled, (state, action) => {
      state.isLoading = false
      state.item = action.payload
    })
    builder.addCase(fetchCategoriesThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchCategoriesThunk.rejected, (state) => {
      state.error = 'something went wrong'
      state.isLoading = false
    })
    builder.addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
      state.isLoading = false
      state.categories = action.payload
    })
    builder.addCase(addProductThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addProductThunk.rejected, (state) => {
      state.error = 'something went wrong'
      state.isLoading = false
    })
    builder.addCase(addProductThunk.fulfilled, (state, action) => {
      state.isLoading = false
      console.log('action.payload adddd', action.payload)

      // state.items = [action.payload, ...state.items]
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
