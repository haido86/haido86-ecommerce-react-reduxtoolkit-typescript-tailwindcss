import { User } from './../../type'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { setNotification } from '../../components/notification/notificationSlice'
import api from '../../api'

type LoginPayload = {
  username: string
  password: string
}

type AuthState = {
  isLoading: boolean
  isLogin: null | User
  error: string
}

const currentUser = localStorage.getItem('user')

const initialState: AuthState = {
  isLoading: false,
  isLogin: currentUser ? JSON.parse(currentUser) : null,
  error: ''
}

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }: LoginPayload, { dispatch }) => {
    try {
      const res = await api.post('/auth/signin', { username: username, password: password })
      const data = await res.data
      if (data) {
        dispatch(setNotification({ content: 'Login success', duration: 5000, type: 'success' }))
        const token = data.token.token
        const user = data.user
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        return data.user
      } else {
        dispatch(
          setNotification({
            content: 'Wrong email or password. Please try again',
            duration: 5000,
            type: 'error'
          })
        )
        throw new Error('Invalid login credentials')
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut(state) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      state.isLogin = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false
      state.isLogin = initialState.isLogin
      state.error = 'Something went wrong'
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false
      const user = localStorage.getItem('user')
      state.isLogin = user ? JSON.parse(user) : action.payload
    })
  }
})

export const { logOut } = authSlice.actions

export default authSlice.reducer
