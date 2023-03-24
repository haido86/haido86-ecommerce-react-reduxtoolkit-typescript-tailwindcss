import { createSlice } from '@reduxjs/toolkit'

type NotificationState = {
  content: string
  type: string
  isShow: boolean
  duration: number
}

const initialState: NotificationState = {
  content: '',
  type: '',
  isShow: false,
  duration: 500
}
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      console.log('action', action)
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

export const setNotification = ({ content, duration, type }: NotificationState) => {
  return async (
    dispatch: (arg0: {
      payload: unknown
      type: 'notification/showNotification' | 'notification/clearNotification'
    }) => void
  ): Promise<void> => {
    dispatch(showNotification({ content, duration, type }))
    if (timeOutId) {
      clearTimeout(timeOutId)
    }
    timeOutId = setTimeout(() => {
      dispatch(clearNotification())
    }, duration)
  }
}

export default notificationSlice.reducer
