import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

type User = {
  id: number
  role: string
  email: string
  password: string
}

type UserState = {
  isLoading: boolean
  error: null | string
  data: User[]
}

const initialState: UserState = {
  isLoading: false,
  error: null,
  data: []
}

export const fetchUsers = createAsyncThunk('users/fetch', async (keyword: string) => {
  const res = await fetch('http://localhost:5173/data/users.json')
  let users = await res.json()

  if (keyword.length > 0) {
    users = users.filter((user: { email: string }) =>
      user.email.toLowerCase().includes(keyword.toLowerCase())
    )
  }

  return users
})

// export const addUser = createAsyncThunk(
//   'users/signin',
//   async ({
//     email,
//     password,
//     repeatPassword
//   }: {
//     email: string
//     password: string
//     repeatPassWord: string
//   }) => {
//     const res = await fetch('http://localhost:5173/data/users.json')
//     const users = await res.json()
//     const findUserByEmail = users.find((user: { email: string }) => user.email === email)

//     if (findUserByEmail) return 'This email already in the system, please sign in'
//     else
//   }
// )

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchUsers.rejected, (state) => {
      state.error = 'something went wrong'
      state.isLoading = false
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = action.payload
    })
  }
})

export default usersSlice.reducer
