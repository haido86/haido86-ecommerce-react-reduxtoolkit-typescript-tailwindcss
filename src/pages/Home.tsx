import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddProductForm from '../components/form/AddProductForm'
import ProductCard from '../components/productCard'
import { addToCartAction } from '../features/products/cartSlice'
import { AppDispatch, RootState } from '../store'
import { Product } from '../type'

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
    <div>
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
