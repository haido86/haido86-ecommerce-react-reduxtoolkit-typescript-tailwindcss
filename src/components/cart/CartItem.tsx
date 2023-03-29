import { ChangeEvent, useEffect, useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { removeFromCart, updateProductAmount } from '../../features/products/cartSlice'
import { AppDispatch } from '../../store'
import { ItemInCart } from '../../type'

function CartItem({ item }: { item: ItemInCart }) {
  const dispatch = useDispatch<AppDispatch>()
  const [stateOfCart, setStateOfCart] = useState<ItemInCart | null>(null)

  useEffect(() => {
    setStateOfCart(item)
  }, [item])

  const handleOrderAmountChange = (event: ChangeEvent<HTMLInputElement>, id: number) => {
    dispatch(updateProductAmount({ id: event.target.id, orderAmount: +event.target.value }))
  }

  return (
    <div>
      <div key={item.id} className="flex justify-between pb-3 pt-3 border-b border-b-gray-100">
        <img className="w-[50px] h-[50px]" src={item.image} alt={item.title} />
        <div>
          {`${item.title}`.slice(0, 20)}
          <div>{`${item.price} €`}</div>
          <input
            type="number"
            defaultValue={item.orderAmount}
            value={stateOfCart?.orderAmount}
            onChange={(event) => handleOrderAmountChange(event, item.id)}
            id={`${item.id}`}
            min={0}
            className="bg-gray-100 w-8 h-8 text-center text-sm"
          />
        </div>
        <div className="flex flex-col justify-between">
          <button onClick={() => dispatch(removeFromCart(item.id))}>
            <RiDeleteBin6Line size={20} />
          </button>
          <div className="text-red-500">{`${item.price * item.orderAmount} €`}</div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
