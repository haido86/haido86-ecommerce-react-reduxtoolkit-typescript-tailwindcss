import productsSlice from '../slices/products/productsSlice'
import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../slices/users/userSlice'
import notificationSlice from '../components/notification/notificationSlice'
import authSlice from '../slices/auth/authSlice'
import cartSlice from '../slices/products/cartSlice'

export const store = configureStore({
  reducer: {
    products: productsSlice,
    users: userSlice,
    auth: authSlice,
    notification: notificationSlice,
    cart: cartSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
