import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { setNotification } from '../../components/notification/notificationSlice'
import { User } from '../../type'

type LoginPayload = {
  email: string
  password: string
}

type AuthState = {
  isLoading: boolean
  isLogin: User | null
  error: string
}

const initialState: AuthState = {
  isLoading: false,
  isLogin: null,
  error: ''
}

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: LoginPayload, { dispatch }) => {
    const res = await fetch('http://localhost:5173/data/users.json')
    const users = await res.json()
    const findUserByEmail = users.find(
      (user: LoginPayload) => user.email === email && user.password === password
    )
    if (findUserByEmail) {
      dispatch(setNotification({ content: 'Login success', duration: 1000, type: 'success' }))
      return findUserByEmail
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
    setUser(state, action) {
      state.isLogin = action.payload.isLogin
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
      state.isLogin = action.payload
      state.error = ''
    })
  }
})

export const { setUser } = authSlice.actions

export default authSlice.reducer
