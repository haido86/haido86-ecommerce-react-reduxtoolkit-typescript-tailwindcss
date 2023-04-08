import { RiDeleteBin6Line } from 'react-icons/ri'
import { IoMdAdd, IoMdRemove } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import {
  decreaseProductAmount,
  increaseProductAmount,
  removeFromCart
} from '../../features/products/cartSlice'
import { AppDispatch } from '../../store'
import { ItemInCart } from '../../type'

function CartItem({ item }: { item: ItemInCart }) {
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div>
      <div key={item.id} className="flex justify-between pb-3 pt-3 border-b border-b-gray-100">
        <img className="max-w-[80px]" src={item.image} alt={item.title} />
        <div>
          <div className="text-sm uppercase mt-2 hover:underline">
            <Link to={`/products/${item.id}`}>{`${item.title}`.slice(0, 20)}</Link>
          </div>
          <div className="text-sm text-gray-500">{`${item.price} €`}</div>
          <div className="flex items-center mt-2 border border-gray-200 w-[100px] justify-between px-2 py-1 text-sm">
            <button onClick={() => dispatch(decreaseProductAmount(item.id))}>
              <IoMdRemove />
            </button>
            <div>{item.orderAmount}</div>
            <button onClick={() => dispatch(increaseProductAmount(item.id))}>
              <IoMdAdd />
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-between mt-2 items-end w-[80px]">
          <button onClick={() => dispatch(removeFromCart(item.id))}>
            <RiDeleteBin6Line size={20} />
          </button>
          <div className="text-red-500">{`${(item.price * item.orderAmount).toFixed(2)} €`}</div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
