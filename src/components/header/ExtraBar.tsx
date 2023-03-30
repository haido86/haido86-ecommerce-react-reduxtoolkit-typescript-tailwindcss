// import { useState } from 'react'
import { useState } from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { filteredProductsAction } from '../../features/products/productsSlice'
import { AppDispatch, RootState } from '../../store'

function ExtraBar() {
  const { products } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<AppDispatch>()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const categories = [...new Set(products.items.map((product) => product.category))]
  const filterCategory = categories.find((category) => category === searchTerm)

  return (
    <div>
      <div className="mt-5 mx-10 mb-10 justify-around px-2 py-1 flex flex-col sm:flex-row ">
        {products.filteredProductArr.length === 0 ||
        products.filteredProductArr.length === products.items.length ? (
          categories.map((category, index) => (
            <div key={`category-${index}`}>
              <div className="flex">
                <button
                  onClick={() => {
                    setSearchTerm(`${category}`)
                    dispatch(filteredProductsAction(`${category}`))
                  }}
                  className="bg-gray-200 rounded-full px-3 py-1"
                  key={`category-${index}`}>
                  {category}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex">
            <button
              className="mr-20 hover:bg-gray-200 rounded-full p-2"
              onClick={() => {
                setSearchTerm('')
                dispatch(filteredProductsAction(''))
              }}>
              <IoArrowBackOutline size={20} />
            </button>
            <div className="bg-gray-200 rounded-full px-3 py-1">{filterCategory}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExtraBar
