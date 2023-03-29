import { createSlice } from '@reduxjs/toolkit'
import { ItemInCart } from '../../type'

type CartState = {
  isLoading: boolean
  error: string
  cartArr: ItemInCart[]
}
const initialState: CartState = {
  isLoading: false,
  error: '',
  cartArr: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCartAction: (state, action) => {
      const foundProduct = state.cartArr.find((item) => item.id == action.payload.id)
      if (foundProduct) {
        state.cartArr = state.cartArr.map((item) => {
          if (item.id == action.payload.id) {
            item.orderAmount += 1
          }
          return item
        })
      } else {
        state.cartArr.push({ ...action.payload, orderAmount: 1 })
      }
    },
    removeFromCart: (state, action) => {
      const itemToRemove = state.cartArr.find((item) => item.id == action.payload)
      if (itemToRemove) {
        itemToRemove.orderAmount -= 1
        if (itemToRemove.orderAmount == 0) {
          state.cartArr = state.cartArr.filter((item) => item.id !== action.payload)
        }
      }
    },
    updateProductAmount: (state, action) => {
      if (action.payload.orderAmount == 0) {
        state.cartArr = state.cartArr.filter((item) => item.id != action.payload.id)
      }
      state.cartArr = state.cartArr.map((item) => {
        if (item.id == action.payload.id) {
          item.orderAmount = action.payload.orderAmount
        }
        return item
      })
    },
    emptyCart: () => {
      return initialState
    }
  },
  extraReducers: {}
})

export const { addToCartAction, removeFromCart, updateProductAmount, emptyCart } = cartSlice.actions

export default cartSlice.reducer
