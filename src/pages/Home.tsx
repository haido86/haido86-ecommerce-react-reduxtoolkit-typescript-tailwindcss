//display products

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsThunk } from '../features/products/productsSlice'
import { AppDispatch, RootState } from '../store'

function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const { products } = useSelector((state: RootState) => state)
  console.log('products', products)
  useEffect(() => {
    dispatch(fetchProductsThunk())
  }, [])

  return (
    <div>
      <div>Home</div>
      <div>List of Products</div>
      {products && products.items.map((product) => <div key={product.id}>{product.title}</div>)}
    </div>
  )
}

export default Home
