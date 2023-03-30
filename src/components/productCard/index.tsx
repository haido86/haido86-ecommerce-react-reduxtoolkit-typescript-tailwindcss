import { FaCartPlus, FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../store'
import { Product } from '../../type'

type AddToCartFunction = (product: Product) => void

function ProductCard({ product, addToCart }: { product: Product; addToCart: AddToCartFunction }) {
  const { auth } = useSelector((state: RootState) => state)
  return (
    <div
      className=" m-1 relative flex flex-col items-center object-cover border border-gray-200 rounded-md"
      key={product.id}>
      <button
        onClick={() => {
          addToCart(product)
        }}
        className="absolute bottom-2 right-2 bg-yellow-300 rounded-full p-2 ">
        <FaCartPlus size={20} />
      </button>
      {auth?.isLogin?.role === 'admin' && (
        <div>
          <div className="absolute top-2 right-2 font-bold bg-green-300 flex items-center p-2 ">
            <FaRegEdit size={20} />
          </div>
          <div className="absolute top-2 left-2 font-bold bg-red-300 flex items-center p-2 ">
            <RiDeleteBin5Line size={20} />
          </div>
        </div>
      )}
      <img className="h-40 w-auto p-3" src={product.image} alt={product.title} />
      <div className="border-t-gray-100">
        <Link to={`/products/${product.id}`}>
          <div className="mt-2 font-bold">{`${product.title}`.slice(0, 12)}</div>
        </Link>
        <div className="text-red-500 mb-2">{`${product.price} €`}</div>
      </div>
    </div>
  )
}

export default ProductCard
