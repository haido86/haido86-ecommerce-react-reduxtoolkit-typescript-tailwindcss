import Select from 'react-select'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addProductThunk } from '../../slices/productsSlice'
import { AppDispatch, RootState } from '../../store/store'
import { CategoryOption, ProductRequest, Product } from '../../types/type'
import { getOptions } from '../../utils/options'
import Button from '../Button'

function AddProductForm() {
  const { products, auth } = useSelector((state: RootState) => state)
  const [formOpen, setFormOpen] = useState<boolean>()
  const [newProduct, setNewProduct] = useState<Partial<Product> | undefined>()
  const dispatch = useDispatch<AppDispatch>()

  const options: CategoryOption[] = getOptions(products.categories)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    if (products.items) {
      setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }))
    }
  }
  const handleCategoryChange = (selectedOption: CategoryOption | null) => {
    const category = selectedOption?.value
    if (category) {
      const selectedCategory = products?.categories.find(
        (cat) => cat.name.toLowerCase() === category.toLowerCase()
      )
      if (selectedCategory) {
        setNewProduct((prevProduct) => ({
          ...prevProduct,
          category: selectedCategory
        }))
      }
    }
  }
  const handleInventoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const quantity = event.target.value
    if (products.items) {
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        inventory: { id: 0, quantity: +quantity }
      }))
    }
  }
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (
      newProduct &&
      newProduct?.title &&
      newProduct?.price &&
      newProduct?.description &&
      newProduct?.category &&
      newProduct?.inventory &&
      newProduct?.inventory?.quantity
    ) {
      const product: Partial<ProductRequest> = {
        productDTO: {
          categoryId: newProduct.category.id,
          price: newProduct.price,
          title: newProduct.title,
          description: newProduct.description,
          image: newProduct.image || ''
        },
        quantity: newProduct.inventory.quantity
      }
      dispatch(addProductThunk(product))
    }
    setFormOpen(!formOpen)
  }

  return (
    <div>
      {auth?.loginUser?.role === 'ADMIN' && (
        <Button
          className="bg-green-400 rounded-full ml-10 font-bold px-2 py-1"
          onClick={() => setFormOpen(!formOpen)}>
          Add New Product
        </Button>
      )}
      {formOpen && (
        <div className="z-10 right-0 top-32 absolute duration-300 bg-white shadow w-full p-20 lg:top-20 sm:max-w-[500px]">
          <h2 className="text-xl font-bold mb-2">Add Product Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                placeholder="Title"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">
                Image Url
              </label>
              <input
                type="text"
                id="image"
                name="image"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                placeholder="Image Url"
                onChange={handleInputChange}
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                placeholder="description"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
                Inventory <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="inventory"
                name="inventory"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                placeholder="inventory"
                onChange={handleInventoryChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
                Category <span className="text-red-500">*</span>
              </label>
              <Select
                options={options}
                name="category"
                id="category"
                onChange={handleCategoryChange}
                value={options.find((option) => option.value === newProduct?.category?.name)}
              />
            </div>
            <div className="flex flex-col mt-10">
              <Button
                type="submit"
                className="text-white uppercase bg-black focus:ring-4 focus:outline-none font-medium hover:bg-gray-800 text-sm max-w-full sm:w-auto px-5 py-2.5 text-center">
                Create New Product
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default AddProductForm
