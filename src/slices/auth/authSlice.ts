import jwt_decode from 'jwt-decode'
import { User } from '../../types/type'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { setNotification } from '../../components/notification/notificationSlice'
import api from '../../api'

type LoginPayload = {
  username: string
  password: string
}

type AuthState = {
  isLoading: boolean
  loginUser: null | Partial<User>
  error: string
}

export interface DecodedToken {
  user_id: number
  username: string
  role: string
}

const currentUser = localStorage.getItem('user')

const initialState: AuthState = {
  isLoading: false,
  loginUser: currentUser ? JSON.parse(currentUser) : null,
  error: ''
}

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }: LoginPayload, { dispatch }) => {
    try {
      const res = await api.post('/auth/signin', { username: username, password: password })
      const data = await res.data
      console.log('response data', data)

      if (data) {
        dispatch(setNotification({ content: 'Login success', duration: 5000, type: 'success' }))
        const token = data.token
        localStorage.setItem('token', token)
        return data.token
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
    getUserFromStorage(state) {
      const token = localStorage.getItem('token')
      if (token) {
        const decodedToken: DecodedToken = jwt_decode(token)
        // if (decodedToken) {
        state.loginUser = {
          id: decodedToken.user_id,
          username: decodedToken.username,
          role: decodedToken.role
          // }
        }
      }
    },
    logOut(state) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      state.loginUser = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false
      state.loginUser = initialState.loginUser
      state.error = 'Something went wrong'
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false
      // const user = localStorage.getItem('user')
      // state.loginUser = user ? JSON.parse(user) : action.payload
    })
  }
})

export const { logOut } = authSlice.actions

export default authSlice.reducer
