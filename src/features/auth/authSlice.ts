import { User } from './../../type'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { setNotification } from '../../components/notification/notificationSlice'

type LoginPayload = {
  username: string
  password: string
}

type AuthState = {
  isLoading: boolean
  isLogin: null | User
  error: string
  token: string
}

const initialState: AuthState = {
  isLoading: false,
  isLogin: null,
  error: '',
  token: ''
}

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }: LoginPayload, { dispatch }) => {
    const res = await axios.post('http://localhost:8080/api/v1/auth/signin', {
      username: username,
      password: password
    })
    const data = await res.data
    if (data) {
      dispatch(setNotification({ content: 'Login success', duration: 5000, type: 'success' }))
      console.log('data', data)
      return data
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
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut(state) {
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
      state.isLogin = action.payload.user
      state.token = action.payload.token
      state.error = ''
    })
  }
})

export const { logOut } = authSlice.actions

export default authSlice.reducer
