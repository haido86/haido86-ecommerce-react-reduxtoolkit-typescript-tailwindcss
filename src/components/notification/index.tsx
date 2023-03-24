import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

function Notification() {
  const notification = useSelector((state: RootState) => state.notification)
  console.log('notification', notification)
  return <div>Notification</div>
}

export default Notification
