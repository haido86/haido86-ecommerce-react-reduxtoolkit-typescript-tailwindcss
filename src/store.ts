import productsSlice from './features/products/productsSlice'
import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/user/userSlice'
import notificationSlice from './components/notification/notificationSlice'
import authSlice from './features/auth/authSlice'
import cartSlice from './features/products/cartSlice'

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
