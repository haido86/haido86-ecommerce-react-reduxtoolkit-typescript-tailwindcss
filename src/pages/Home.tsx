//display products

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsThunk } from '../features/products/productsSlice'
import { AppDispatch, RootState } from '../store'

function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const { products } = useSelector((state: RootState) => state)

  const keyword = 'women'
  useEffect(() => {
    dispatch(fetchProductsThunk(keyword))
  }, [keyword])

  return (
    <div>
      <div className="mt-20">List of Products</div>
      <ul className="p-0.5 grid grid-cols-3 transition duration-150 sm:grid-cols-5">
        {products &&
          products.items.map((product) => (
            <div className="bg-green-100 m-1" key={product.id}>
              <img className="h-40 w-auto" src={product.image} alt={product.title} />
              {product.title}
            </div>
          ))}
      </ul>
    </div>
  )
}

export default Home
