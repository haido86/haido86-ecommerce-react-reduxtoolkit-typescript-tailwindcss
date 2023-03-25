import { useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { RiUserFill } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import SignInForm from '../../features/user/signInForm'
import { RootState } from '../../store'

function Dropdown() {
  const [isLoginDropDown, setIsLoginDropDown] = useState(false)
  const [isCartDropDown, setIsCartDropDown] = useState(false)
  const { auth } = useSelector((state: RootState) => state)

  return (
    <div>
      <div className="flex">
        <button
          onClick={() => setIsLoginDropDown(!isLoginDropDown)}
          className={
            isLoginDropDown
              ? 'flex items-center m-3 font-bold border-b-2 border-stone-700'
              : 'flex items-center m-3 font-bold '
          }>
          <RiUserFill size={20} className="mr-1" />
          {auth?.isLogin?.role ? 'Logout' : 'Login'}
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

export default Dropdown
