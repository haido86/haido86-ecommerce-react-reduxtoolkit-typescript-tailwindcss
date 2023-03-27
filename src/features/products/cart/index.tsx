// import { useState } from 'react'

import { RiDeleteBin6Line } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

function Cart() {
  const { cart } = useSelector((state: RootState) => state)
  console.log('this cart', cart)

  return (
    <div>
      This is card
      {cart.data.map((item) => (
        <div key={item.title}>
          <img className="w-[30px]" src={item.image} alt={item.title} />
          <input type="number" id="quantity" min={1} className="bg-gray-100" />
          {item.title}
          <RiDeleteBin6Line />
        </div>
      ))}
    </div>
  )
}

export default Cart
