import { useSelector } from 'react-redux'
import { RootState } from '../store'

function CheckOut() {
  const { auth } = useSelector((state: RootState) => state)
  return (
    <div>
      {auth?.isLogin?.role !== 'user' ? (
        <div className="font-bold text-xl m-20">Please Login or Become our member to proceed</div>
      ) : (
        <div className="font-bold text-xl m-20">Check Out Process</div>
      )}
    </div>
  )
}

export default CheckOut
