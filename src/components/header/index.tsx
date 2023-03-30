import SearchBar from './SearchBar'
import Navbar from './Navbar'
import Dropdown from './Dropdown'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
      <div className="flex justify-between max-w-full mx-auto items-center p-4 flex-wrap">
        <div className="flex items-center">
          <Navbar />
          <div className="px-4 text-2xl sm:text-3xl lg:text-4xl text-red-600">
            <Link to="/">
              <span className="font-bold ">Hai</span>Do
            </Link>
          </div>
        </div>
        <SearchBar />
        <Dropdown />
      </div>
    </header>
  )
}

export default Header
