import { AiOutlineClose } from 'react-icons/ai'
import { RiUserFill, RiMenuFill } from 'react-icons/ri'
import { FaShoppingCart } from 'react-icons/fa'
import { IoShirtSharp, IoHelpCircle, IoTicket } from 'react-icons/io5'
import { useState } from 'react'
import SearchBar from './SearchBar'
import SignInForm from '../../features/user/signInForm'

function Header() {
  const [nav, setNav] = useState(false)
  const [isLoginDropDown, setIsLoginDropDown] = useState(false)
  const [isCartDropDown, setIsCartDropDown] = useState(false)

  return (
    <div className="flex justify-between max-w-full mx-auto items-center p-4 flex-wrap">
      <div className="flex items-center">
        <div
          onClick={() => setNav(!nav)}
          className="cursor-pointer flex flex-col place-items-center hover:rounded-full w-auto h-auto px-4 py-2 font-bold">
          <RiMenuFill size={30} />
          Menu
        </div>
        <div className="px-4 text-2xl sm:text-3xl lg:text-4xl text-red-600">
          <span className="font-bold ">Hai</span>Do
        </div>
      </div>
      <SearchBar />
      <div className="flex">
        <button
          onClick={() => setIsLoginDropDown(!isLoginDropDown)}
          className={
            isLoginDropDown
              ? 'flex items-center m-3 font-bold border-b-2 border-stone-700'
              : 'flex items-center m-3 font-bold '
          }>
          <RiUserFill size={20} className="mr-1" />
          Login
        </button>
        <button
          onClick={() => setIsCartDropDown(!isCartDropDown)}
          className={
            isCartDropDown
              ? 'flex items-center m-3 font-bold border-b-2 border-stone-700'
              : 'flex items-center m-3 font-bold '
          }>
          <FaShoppingCart size={20} className="mr-1" />
          Cart
        </button>
      </div>
      {nav ? <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div> : ''}
      <div
        className={
          nav
            ? 'fixed top-0 left-0 w-[300px] h-screen z-10 duration-300 bg-white'
            : 'fixed top-0 left-[-100%] w-[300px] h-screen z-10 duration-300 bg-white'
        }>
        <AiOutlineClose
          onClick={() => setNav(!nav)}
          className="absolute right-4 top-4 cursor-pointer"
          size={30}
        />
        <h2 className="text-xl p-4">
          <span className="font-bold">Hai</span>Do <span className="font-bold">W</span>elcome!
        </h2>
        <nav>
          <ul className="flex flex-col p-4 text-gray-800">
            <li className="text-xl py-4 flex">
              <IoShirtSharp size={25} className="mr-4" />
              Products
            </li>
            <li className="text-xl py-4 flex">
              <IoHelpCircle size={25} className="mr-4" />
              Help
            </li>
            <li className="text-xl py-4 flex">
              <IoTicket size={25} className="mr-4" />
              Promotions
            </li>
          </ul>
        </nav>
      </div>
      {isLoginDropDown ? (
        <div className="z-10 right-0 top-32 absolute duration-300 bg-white shadow w-full p-20 lg:top-20 sm:max-w-[500px]">
          <SignInForm />
        </div>
      ) : (
        ''
      )}
      {isCartDropDown ? (
        <div className="z-10 right-0 top-32 absolute duration-300 bg-white shadow w-full p-20 lg:top-20 sm:max-w-[300px]">
          <div>This place is for Cart</div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default Header
