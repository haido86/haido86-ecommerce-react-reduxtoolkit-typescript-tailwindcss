import { memo } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

function Notification() {
  const { notification } = useSelector((state: RootState) => state)

  console.log('notification', notification)

  return (
    <>
      <div>
        {notification.isShow && (
          <div className="border-red-600 rounded-md border">{notification.content}</div>
        )}
      </div>
    </>
  )
}

export default memo(Notification)
