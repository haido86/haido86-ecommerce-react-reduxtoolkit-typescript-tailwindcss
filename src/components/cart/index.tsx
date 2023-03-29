import { useDispatch, useSelector } from 'react-redux'
import { emptyCart } from '../../features/products/cartSlice'
import { AppDispatch, RootState } from '../../store'
import CartItem from './CartItem'

function Cart() {
  const { cart } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<AppDispatch>()

  const returnTotal = cart.cartArr.reduce((total, item) => {
    return total + item.price * item.orderAmount
  }, 0)

  return (
    <div className="flex flex-col">
      {cart.cartArr.length === 0 && <div>Add items to your cart</div>}
      {cart.cartArr.length > 0 &&
        cart.cartArr.map((item) => <CartItem key={item.id} item={item} />)}
      <div className="flex justify-between border-t-gray-200 border-t mt-5">
        <div className="font-bold mt-3">Total</div>
        <div className="font-bold mt-3 text-red-500">{`${returnTotal} €`}</div>
      </div>
      <button
        type="submit"
        className="mt-10 text-white bg-black focus:ring-4 focus:outline-none font-medium hover:bg-gray-800 text-sm max-w-full sm:w-auto px-5 py-2.5 text-center">
        Check Out
      </button>
      <button
        type="submit"
        className="mt-3 bg-white focus:outline-none font-bold  text-sm max-w-full border border-black sm:w-auto px-5 py-2.5 text-center">
        Shopping Cart
      </button>
      <button
        onClick={() => dispatch(emptyCart())}
        className="mt-3 bg-gray-100 hover:bg-gray-200 focus:outline-none font-bold  text-sm max-w-full  sm:w-auto px-5 py-2.5 text-center">
        Empty Cart
      </button>
    </div>
  )
}

export default Cart
