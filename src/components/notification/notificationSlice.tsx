import { createSlice } from '@reduxjs/toolkit'
import { AppDispatch } from '../../store'

type NotificationState = {
  content: string
  type: string
  duration: number
  isShow: boolean
}

const initialState: NotificationState = {
  content: '',
  type: '',
  duration: 1000,
  isShow: false
}
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      state.content = action.payload.content
      state.type = action.payload.type
      state.isShow = true
    },
    clearNotification(state) {
      state.isShow = false
    }
  }
})

export const { showNotification, clearNotification } = notificationSlice.actions

let timeOutId: number | undefined

export const setNotification = ({
  content,
  type,
  duration
}: {
  content: string
  type: string
  duration: number
}) => {
  return async (dispatch: AppDispatch) => {
    dispatch(showNotification({ content, type, duration }))
    if (timeOutId) {
      clearTimeout(timeOutId)
    }
    timeOutId = setTimeout(() => {
      dispatch(clearNotification())
    }, duration)
  }
}

export default notificationSlice.reducer
