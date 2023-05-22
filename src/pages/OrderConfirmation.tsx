import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { RootState } from '../store/store'

function OrderConfirmation() {
  const { order } = useSelector((state: RootState) => state)

  console.log('order', order?.item?.orderItemList)
  const returnTotal = order?.item?.orderItemList.reduce((total, item) => {
    return total + item.product.price * item.quantity
  }, 0)

  return (
    <div className="w-full sm:px-[70px]">
      <div className="font-bold text-xl mb-5">Confirm your order</div>
      {order?.item?.orderItemList.map((item) => (
        <div key={item.id} className="flex pb-3 pt-3 border-b border-b-gray-100">
          <img className="max-w-[80px]" src={item.product.image} alt={item.product.title} />
          <div className="flex-1 ml-3">
            <div className="text-sm uppercase mt-2 hover:underline">
              <Link to={`/products/${item.id}`}>{`${item.product.title}`.slice(0, 20)}</Link>
            </div>
            <div className="text-sm text-gray-500">{`${item.product.price} €`}</div>
            <div className="flex items-center mt-2 w-[100px] justify-between px-2 py-1 text-sm">
              Quantity: {item.quantity}
            </div>
          </div>
          <div className="flex flex-col justify-between mt-2 items-end w-[80px]">
            <div className="text-red-500">{`${(item.product.price * item.quantity).toFixed(
              2
            )} €`}</div>
          </div>
        </div>
      ))}
      {returnTotal && (
        <div className="flex justify-between border-t-gray-200 border-t mt-5">
          <div className="font-bold mt-3">Total</div>
          <div className="font-bold mt-3 text-red-500">{`${returnTotal.toFixed(2)} €`}</div>
        </div>
      )}
      <div className="flex justify-between mt-10">
        <button className="font-bold border bg-white text-black px-3 py-1.5 rounded-md">
          Cancel
        </button>
        <button className="font-bold border px-3 py-1.5 text-white bg-black rounded-md">
          Proceed to Payment
        </button>
      </div>
    </div>
  )
}

export default OrderConfirmation