import SearchBar from './SearchBar'
import Navbar from './Navbar'
import Dropdown from './Dropdown'

function Header() {
  return (
    <div className="flex justify-between max-w-full mx-auto items-center p-4 flex-wrap">
      <div className="flex items-center">
        <Navbar />
        <div className="px-4 text-2xl sm:text-3xl lg:text-4xl text-red-600">
          <span className="font-bold ">Hai</span>Do
        </div>
      </div>
      <SearchBar />
      <Dropdown />
    </div>
  )
}

export default Header
