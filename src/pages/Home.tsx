import { useDispatch, useSelector } from 'react-redux'

import { addToCartAction } from '../slices/products/cartSlice'
import { AppDispatch, RootState } from '../store/store'
import { Product } from '../types/type'
import ExtraBar from '../components/ExtraBar'
import AddProductForm from '../components/form/AddProductForm'
import ProductCard from '../components/productCard'

function Home() {
  const { products } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<AppDispatch>()

  if (products.isLoading) {
    return <div>Loading...</div>
  }

  const addToCart = (product: Product) => {
    dispatch(addToCartAction(product))
  }

  return (
    <div className="min-h-screen">
      <ExtraBar />
      <AddProductForm />
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
