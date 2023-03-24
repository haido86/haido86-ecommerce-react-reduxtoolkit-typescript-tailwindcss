import { ChangeEvent, FormEvent, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { fetchProductsThunk } from '../../features/products/productsSlice'
import { AppDispatch } from '../../store'

function SearchBar() {
  const [keyword, setKeyword] = useState('')
  const dispatch = useDispatch<AppDispatch>()

  const handleKeyWordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value)
  }

  const addKeyWord = (event: FormEvent) => {
    event.preventDefault()
    dispatch(fetchProductsThunk(keyword))
  }

  return (
    <form
      onSubmit={addKeyWord}
      className="bg-gray-200 rounded-full flex items-center px-2 w-full order-1 lg:order-none lg:w-[500px] ">
      <AiOutlineSearch size={20} />
      <input
        value={keyword}
        onChange={handleKeyWordChange}
        className="bg-transparent p-2 focus:outline-none w-full"
        type="text"
        placeholder="Search Products"
      />
    </form>
  )
}

export default SearchBar
