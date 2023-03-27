import { FaCartPlus, FaRegEdit } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCartThunk } from '../features/products/cartSlice'
import { addNew } from '../features/products/productsSlice'
import { AppDispatch, RootState } from '../store'

function Home() {
  const { auth, products, cart } = useSelector((state: RootState) => state)
  console.log('cart', cart)

  const dispatch = useDispatch<AppDispatch>()

  const addToCart = (id: number) => {
    dispatch(addToCartThunk({ id }))
  }

  return (
    <div>
      <div className="m-10 ">List of Products</div>
      {auth?.isLogin?.role === 'admin' && (
        <button
          className="bg-yellow-200 rounded-full font-bold px-2 py-1"
          onClick={() => dispatch(addNew())}>
          Add New Product
        </button>
      )}
      <ul className="p-1 m-5 grid grid-cols-3 gap-y-10 gap-x-4 transition duration-150 sm:grid-cols-5">
        {products &&
          products.items.map((product) => (
            <div
              className=" m-1 relative bg-gray-100 flex flex-col items-center object-cover"
              key={product.id}>
              <button
                onClick={() => {
                  addToCart(product.id)
                }}
                className="absolute bottom-2 right-2 bg-yellow-300 rounded-full p-2 ">
                <FaCartPlus size={20} />
              </button>
              {auth?.isLogin?.role === 'admin' && (
                <div className="absolute top-2 right-2 font-bold bg-white border flex items-center rounded-full p-2 ">
                  <FaRegEdit size={20} />
                </div>
              )}
              <img className="h-40 w-auto" src={product.image} alt={product.title} />
              <Link to={`/products/${product.id}`}>
                <div className="mt-2 font-bold">{`${product.title}`.slice(0, 12)}</div>
              </Link>
              <div className="text-red-500 mb-2">{`${product.price} €`}</div>
            </div>
          ))}
      </ul>
    </div>
  )
}

export default Home
