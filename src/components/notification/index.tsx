import { useSelector } from 'react-redux'
import { RootState } from '../../store'

function Notification() {
  const { notification, auth } = useSelector((state: RootState) => state)

  console.log('notification', notification)
  console.log('authhree', auth)

  return <div>{notification && <div>{notification.content}</div>}</div>
}

export default Notification
