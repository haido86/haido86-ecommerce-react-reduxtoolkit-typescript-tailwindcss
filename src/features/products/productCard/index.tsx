import { FaCartPlus, FaRegEdit } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../../store'
import { Product } from '../../../type'

type AddToCartFunction = (id: number) => void

function ProductCard({ product, addToCart }: { product: Product; addToCart: AddToCartFunction }) {
  const { auth } = useSelector((state: RootState) => state)
  return (
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
  )
}

export default ProductCard
