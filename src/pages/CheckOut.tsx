import { useSelector } from 'react-redux'
import Cart from '../components/cart'
import { RootState } from '../store/store'

function CheckOut() {
  const { auth } = useSelector((state: RootState) => state)
  return (
    <div className="min-h-screen">
      {auth?.loginUser?.role !== 'USER' ? (
        <div className="font-bold text-xl m-20">Please Login or Become our member to proceed</div>
      ) : (
        <div className="font-bold text-xl m-20">
          <div>Check Out Process</div>
          <Cart />
        </div>
      )}
    </div>
  )
}

export default CheckOut
