import { IoArrowBackOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import UpdateProductForm from '../components/form/UpdateProductForm'
import { addToCartAction } from '../features/products/cartSlice'
import { AppDispatch, RootState } from '../store'

function ProductDetail() {
  const { products, auth } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams()

  if (!id) {
    return <div>Product not found</div>
  } else {
    const findProductById = products?.items?.find((product) => product.id === +id)

    return (
      <>
        <div className="flex justify-start">
          <Link to="/" className="ml-20 hover:bg-gray-200 rounded-full p-2 max-w-ful mr-4">
            <IoArrowBackOutline size={20} />
          </Link>
          {auth?.isLogin?.role === 'admin' && <UpdateProductForm productId={+id} />}
        </div>
        {findProductById && (
          <div className="sm:grid sm:grid-cols-2 flex flex-col">
            <img
              className="p-10 w-[400px] h-auto sm:w-[600px] "
              src={findProductById?.image}
              alt={findProductById?.title}
            />
            <div className="sm:m-10 m-2">
              <div className="bg-gray-300 p-2">
                <h2 className="font-bold text-xl my-2">{findProductById?.title}</h2>
                <div className="font-bold text-2xl text-red-600 mb-2">
                  {`${findProductById?.price} €`}
                </div>
                <div className="my-2">choices of variant (Dropdown)</div>
                <button
                  onClick={() => dispatch(addToCartAction(findProductById))}
                  className="my-2 bg-red-500 text-white p-2 items-center font-bold w-full">
                  Add to cart
                </button>
              </div>
              <div className="p-2 my-2 bg-white border border-gray-200 order-1 sm:order-none">
                {findProductById?.description}
              </div>
            </div>
          </div>
        )}
      </>
    )
  }
}
export default ProductDetail
