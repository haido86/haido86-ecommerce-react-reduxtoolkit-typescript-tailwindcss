import { IoArrowBackOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { addToCartThunk } from '../features/products/cartSlice'
import ProductCard from '../features/products/productCard'
import { addNew, fetchProductsThunk } from '../features/products/productsSlice'
import { AppDispatch, RootState } from '../store'

function Home() {
  const { auth, products } = useSelector((state: RootState) => state)

  const dispatch = useDispatch<AppDispatch>()

  const addToCart = (id: number) => {
    dispatch(addToCartThunk({ id }))
  }

  const categories = [...new Set(products.items.map((product) => product.category))]

  return (
    <div>
      <button
        className="ml-20 hover:bg-gray-200 rounded-full p-3"
        onClick={() => dispatch(fetchProductsThunk(''))}>
        <IoArrowBackOutline size={30} />
      </button>
      <div className="m-10 flex justify-between">
        {categories.map((category, index) => (
          <button
            onClick={() => {
              dispatch(fetchProductsThunk(`${category}`))
            }}
            className="bg-gray-200 rounded-full px-3 py-1"
            key={`category-${index}`}>
            {category}
          </button>
        ))}
      </div>
      {auth?.isLogin?.role === 'admin' && (
        <button
          className="bg-yellow-200 rounded-full font-bold px-2 py-1"
          onClick={() => dispatch(addNew())}>
          Add New Product
        </button>
      )}
      <div className="p-1 m-5 grid grid-cols-3 gap-y-10 gap-x-4 transition duration-150 sm:grid-cols-5">
        {products &&
          products.items.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
      </div>
    </div>
  )
}

export default Home
