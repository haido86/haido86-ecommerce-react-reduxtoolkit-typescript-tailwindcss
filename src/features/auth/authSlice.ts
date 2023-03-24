import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

type LoginPayload = {
  email: string
  password: string
}

type AuthState = {
  isLoading: boolean
  isLogin: LoginPayload | null
  error: string
}

const initialState: AuthState = {
  isLoading: false,
  isLogin: null,
  error: ''
}

export const login = createAsyncThunk('auth/login', async ({ email, password }: LoginPayload) => {
  const res = await fetch('http://localhost:5173/data/users.json')
  const users = await res.json()
  const findUserByEmail = users.find(
    (user: LoginPayload) => user.email === email && user.password === password
  )
  if (findUserByEmail) {
    return findUserByEmail
  } else {
    throw new Error('Invalid login credentials')
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false
      state.isLogin = initialState.isLogin
      state.error = 'Wrong email or password'
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false
      state.isLogin = action.payload
      state.error = ''
    })
  }
})

export default authSlice.reducer
