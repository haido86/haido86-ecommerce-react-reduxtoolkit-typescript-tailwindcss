import { ChangeEvent, FormEvent, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { filteredProductsAction } from '../../features/products/productsSlice'
import { filteredUserAction } from '../../features/user/userSlice'
import { AppDispatch, RootState } from '../../store'

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch<AppDispatch>()
  const { users } = useSelector((state: RootState) => state)
  console.log('state', users.usersData, users.filteredUserArr)

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }
  console.log('searchTerm', searchTerm)

  const handleSearchTermSubmit = (event: FormEvent) => {
    event.preventDefault()
    dispatch(filteredProductsAction(searchTerm))
    console.log('this is used')

    dispatch(filteredUserAction(searchTerm))
  }

  return (
    <form
      onSubmit={handleSearchTermSubmit}
      className="bg-gray-200 rounded-full flex items-center px-2 w-full order-1 lg:order-none lg:w-[500px] ">
      <AiOutlineSearch size={20} />
      <input
        value={searchTerm}
        onChange={handleSearchTermChange}
        className="bg-transparent p-2 focus:outline-none w-full"
        type="text"
        placeholder="Search"
      />
    </form>
  )
}

export default SearchBar
