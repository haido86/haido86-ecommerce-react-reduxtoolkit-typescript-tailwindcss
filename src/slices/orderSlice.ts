import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../api'
import { Order, OrderRequest } from '../types/type'

type OrderState = {
  isLoading: boolean
  item: Order | null
  error: string
}

const initialState: OrderState = {
  isLoading: false,
  error: '',
  item: null
}

export const makeOrderThunk = createAsyncThunk(
  'orders/fetch',
  async (orderRequest: OrderRequest) => {
    try {
      const res = await api.post('/orders', orderRequest)
      const order = await res.data
      return order
    } catch (error) {
      console.log(error)
      throw error
    }
  }
)

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(makeOrderThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(makeOrderThunk.rejected, (state) => {
      state.error = 'something went wrong'
      state.isLoading = false
    })
    builder.addCase(makeOrderThunk.fulfilled, (state, action) => {
      state.isLoading = false
      state.item = action.payload
    })
  }
})

export default orderSlice.reducer
