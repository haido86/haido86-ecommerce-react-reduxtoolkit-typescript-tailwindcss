import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { User } from '../../type'

type UserState = {
  isLoading: boolean
  error: null | string
  usersData: User[]
  filteredUserArr: User[]
}

const initialState: UserState = {
  isLoading: false,
  error: null,
  usersData: [],
  filteredUserArr: []
}

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  // const res = await fetch(`${import.meta.env.VITE_API_URL}/data/users.json`)
  const res = await fetch(`/data/users.json`)
  const users = await res.json()
  return users
})

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    filteredUserAction(state, action) {
      const filteredUsers = state.usersData.filter(
        (user) =>
          user.firstName.toLowerCase().includes(action.payload.toLowerCase()) ||
          user.lastName.toLowerCase().includes(action.payload.toLowerCase()) ||
          user.email.toLowerCase().includes(action.payload.toLowerCase())
      )
      return {
        ...state,
        filteredUserArr: action.payload.length > 0 ? filteredUsers : [...state.usersData]
      }
    }
  },
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
      state.usersData = action.payload
    })
  }
})
export const { filteredUserAction } = usersSlice.actions

export default usersSlice.reducer
