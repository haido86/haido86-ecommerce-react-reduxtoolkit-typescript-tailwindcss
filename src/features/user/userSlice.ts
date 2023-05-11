import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
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
  const res = await axios.get('http://localhost:8080/api/v1/users')
  const users = await res.data
  return users
})

export const findByUserById = createAsyncThunk('users/find-user', async (userId: number) => {
  const res = await axios.get(`http://localhost:8080/api/v1/users/${userId}`)
  const user = await res.data
  return user
})

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    filteredUserAction(state, action) {
      const filteredUsers = state.usersData.filter((user) =>
        user.username.toLowerCase().includes(action.payload.toLowerCase())
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
