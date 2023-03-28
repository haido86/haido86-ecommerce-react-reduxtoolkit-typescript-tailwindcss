import { useDispatch, useSelector } from 'react-redux'
import { addToCartThunk } from '../features/products/cartSlice'
import ProductCard from '../components/productCard'
import { addProductThunk } from '../features/products/productsSlice'
import { AppDispatch, RootState } from '../store'

function Home() {
  const { auth, products } = useSelector((state: RootState) => state)

  const dispatch = useDispatch<AppDispatch>()

  const addToCart = (id: number) => {
    dispatch(addToCartThunk({ id }))
  }

  return (
    <div>
      {auth?.isLogin?.role === 'admin' && (
        <button
          className="bg-green-400 rounded-full ml-10 font-bold px-2 py-1"
          onClick={() => dispatch(addProductThunk())}>
          Add New Product
        </button>
      )}
      <div className="p-1 m-5 grid grid-cols-3 gap-y-10 gap-x-4 transition duration-150 sm:grid-cols-5">
        {products?.filteredProductArr.length > 0
          ? products.filteredProductArr.map((product) => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))
          : products.items.map((product) => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
      </div>
    </div>
  )
}

export default Home
