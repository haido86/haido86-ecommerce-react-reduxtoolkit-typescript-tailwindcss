import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { IoHelpCircle, IoShirtSharp, IoTicket } from 'react-icons/io5'
import { RiMenuFill } from 'react-icons/ri'

function Navbar() {
  const [nav, setNav] = useState(false)
  return (
    <div>
      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer flex flex-col place-items-center hover:rounded-full w-auto h-auto px-4 py-2 font-bold">
        <RiMenuFill size={30} />
        Menu
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
    </div>
  )
}

export default Navbar
