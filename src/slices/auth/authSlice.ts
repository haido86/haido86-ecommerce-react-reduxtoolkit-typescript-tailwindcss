import jwt_decode from 'jwt-decode'
import { Role, User } from '../../types/type'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { setNotification } from '../../components/notification/notificationSlice'
import api from '../../api'
import { getDecodedTokenFromStorage } from '../../utils/token'

type LoginPayload = {
  username: string
  password: string
}

type AuthState = {
  isLoading: boolean
  loginUser: null | User
  error: string
}

export interface DecodedToken {
  user_id: number
  username: string
  role: Role
}

const initialState: AuthState = {
  isLoading: false,
  loginUser: null,
  error: ''
}

export const login = createAsyncThunk('auth/login', async (user: LoginPayload, { dispatch }) => {
  try {
    const res = await api.post('/auth/signin', user)
    const data = await res.data
    if (data) {
      dispatch(setNotification({ content: 'Login success', duration: 5000, type: 'success' }))
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
})

export const signup = createAsyncThunk('auth/signup', async (user: LoginPayload, { dispatch }) => {
  try {
    const res = await api.post('/auth/signup', user)
    const data = await res.data
    console.log('signupdata', data)

    if (data) {
      dispatch(setNotification({ content: 'Login success', duration: 5000, type: 'success' }))
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
  } catch (error) {
    console.log(error)
    throw error
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getUserFromStorage(state) {
      const user = getDecodedTokenFromStorage()
      if (user) {
        state.loginUser = user
      }
    },
    logOut(state) {
      localStorage.clear()
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
      const token = action.payload
      localStorage.setItem('token', token)
      const decodedToken: DecodedToken = jwt_decode(token)

      const user: User = {
        id: decodedToken.user_id,
        username: decodedToken.username,
        role: decodedToken.role
      }
      state.loginUser = user
    })
    builder.addCase(signup.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(signup.rejected, (state) => {
      state.isLoading = false
      state.loginUser = initialState.loginUser
      state.error = 'Something went wrong'
    })
    builder.addCase(signup.fulfilled, (state, action) => {
      state.isLoading = false
      console.log('action', action.payload)

      // state.loginUser = user
    })
  }
})

export const { logOut, getUserFromStorage } = authSlice.actions

export default authSlice.reducer
