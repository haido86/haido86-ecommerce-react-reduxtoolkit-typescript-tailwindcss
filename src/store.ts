import productsSlice from './features/products/productsSlice'
import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/user/userSlice'
import notificationSlice from './components/notification/notificationSlice'

export const store = configureStore({
  reducer: {
    products: productsSlice,
    users: userSlice,
    notification: notificationSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
