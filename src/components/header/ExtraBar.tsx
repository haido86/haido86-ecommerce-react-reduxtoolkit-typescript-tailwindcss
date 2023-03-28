import { IoArrowBackOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsThunk } from '../../features/products/productsSlice'
import { AppDispatch, RootState } from '../../store'

function ExtraBar() {
  const { products } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<AppDispatch>()

  const categories = [...new Set(products.items.map((product) => product.category))]

  return (
    <div className="mt-5 mx-10 mb-10 justify-around px-2 py-1 flex flex-col sm:flex-row ">
      {categories.map((category, index) => (
        <div key={`category-${index}`}>
          <div className="flex">
            {products.items.length < 20 && (
              <button
                className="mr-20 hover:bg-gray-200 rounded-full p-2"
                onClick={() => dispatch(fetchProductsThunk(''))}>
                <IoArrowBackOutline size={20} />
              </button>
            )}
            <button
              onClick={() => {
                dispatch(fetchProductsThunk(`${category}`))
              }}
              className="bg-gray-200 rounded-full px-3 py-1"
              key={`category-${index}`}>
              {category}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ExtraBar
