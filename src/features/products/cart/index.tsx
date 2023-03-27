import { RiDeleteBin6Line } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

function Cart() {
  const { cart } = useSelector((state: RootState) => state)

  return (
    <div className="flex flex-col">
      {cart.data.length === 0 && <div>Add items to your cart</div>}
      {cart.data.length > 0 &&
        cart.data.map((item) => (
          <div
            key={item.title}
            className="flex justify-between pb-3 pt-3 border-b border-b-gray-100">
            <img className="w-[50px] h-[50px]" src={item.image} alt={item.title} />
            <div>
              {`${item.title}`.slice(0, 20)}
              <div>{`${item.price} €`}</div>
              <input
                type="number"
                defaultValue={item.quantity}
                id="quantity"
                min={0}
                className="bg-gray-100 w-8 h-8 text-center text-sm"
              />
            </div>
            <div className="flex flex-col justify-between">
              <RiDeleteBin6Line size={20} />
              <div className="text-red-500">{`${item.price} €`}</div>
            </div>
          </div>
        ))}
      <div className="flex justify-between border-t-gray-200 border-t mt-5">
        <div className="font-bold mt-3">Total</div>
        <div className="font-bold mt-3 text-red-500">Total number is here</div>
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
    </div>
  )
}

export default Cart
