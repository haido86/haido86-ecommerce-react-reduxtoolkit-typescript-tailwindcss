import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from '../store'

function ProductDetail() {
  const { id } = useParams()
  const { products, auth } = useSelector((state: RootState) => state)

  if (!id) {
    return <div>Product not found</div>
  } else {
    const findProductById = products?.items?.find((product) => product.id === +id)
    console.log('findProductById', findProductById)

    return (
      <>
        {auth?.isLogin?.role === 'admin' && (
          <div className="flex justify-center font-bold bg-yellow-300 w-[100px] rounded-md px-4 py-1">
            Edit
          </div>
        )}
        <div className="flex flex-col m-2">
          <img className="p-20" src={findProductById?.image} alt={findProductById?.title} />
          <div className="p-2 my-2 bg-white border border-gray-200 order-1 sm:order-none">
            {findProductById?.description}
          </div>
          <div className="bg-gray-300 p-2">
            <h2 className="font-bold text-xl my-2">{findProductById?.title}</h2>
            <div className="font-bold text-2xl text-red-600 mb-2">
              {`${findProductById?.price} €`}
            </div>
            <div className="my-2">choices of variant (Dropdown)</div>
            <button className="my-2 bg-red-500 text-white p-2 items-center font-bold w-full">
              Add to cart
            </button>
          </div>
        </div>
      </>
    )
  }
}
export default ProductDetail
