import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProductThunk } from '../../features/products/productsSlice'
import { AppDispatch, RootState } from '../../store'
import { Product } from '../../type'

function UpdateProductForm({ productId }: { productId: number }) {
  const { auth, products } = useSelector((state: RootState) => state)
  const [formOpen, setFormOpen] = useState<boolean>()
  const [updateProduct, setUpdateProduct] = useState<Partial<Product> | undefined>()
  const dispatch = useDispatch<AppDispatch>()

  const findProductToUpdate = products.items.find((item) => item.id === productId)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    if (findProductToUpdate) {
      setUpdateProduct((prevProduct) => ({ ...prevProduct, ...findProductToUpdate, [name]: value }))
    }
  }
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (
      findProductToUpdate &&
      updateProduct &&
      updateProduct?.id &&
      updateProduct?.title &&
      updateProduct?.price &&
      updateProduct?.description &&
      updateProduct?.category
    ) {
      const product: Product = {
        id: productId,
        title: updateProduct.title,
        price: updateProduct.price,
        description: updateProduct.description,
        category: findProductToUpdate.category,
        image: findProductToUpdate.image,
        quantity: 20
      }
      dispatch(updateProductThunk(product))
    }
    setFormOpen(!formOpen)
  }

  return (
    <div>
      {auth?.isLogin?.role === 'admin' && (
        <button
          className="flex justify-center font-bold bg-yellow-300 max-w-80 rounded-md px-4 py-1"
          onClick={() => setFormOpen(!formOpen)}>
          Edit Product Info
        </button>
      )}
      {formOpen && (
        <div className="z-10 right-0 top-32 absolute duration-300 bg-white shadow w-full p-20 lg:top-20 sm:max-w-[500px]">
          <h2 className="text-xl font-bold mb-2">Update Product Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                defaultValue={findProductToUpdate?.title}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                placeholder="Title"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="price"
                name="price"
                defaultValue={findProductToUpdate?.price}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                placeholder="Price"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
                Description <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="description"
                name="description"
                defaultValue={findProductToUpdate?.description}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                placeholder="description"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col mt-10">
              <button
                type="submit"
                className="text-white uppercase bg-black focus:ring-4 focus:outline-none font-medium hover:bg-gray-800 text-sm max-w-full sm:w-auto px-5 py-2.5 text-center">
                Update Product Info
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default UpdateProductForm
