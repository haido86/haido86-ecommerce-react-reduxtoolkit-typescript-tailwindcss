import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { signup } from '../../../slices/auth/authSlice'
import { AppDispatch } from '../../../store/store'

function SignUpFrom() {
  const dispatch = useDispatch<AppDispatch>()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  // const handleRepeatPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setRepeatPassword(event.target.value)
  // }

  const signUp = (event: FormEvent) => {
    event.preventDefault()
    dispatch(signup({ username, password }))
  }

  return (
    <div className="z-10 absolute duration-300 bg-white shadow w-full p-20 lg:top-20 sm:max-w-[500px]">
      <h2 className="text-xl font-bold mb-2">Become a Member</h2>
      <p className="pb-6 text-sm flex">
        Become a Member - You will enjoy exclusive deals, offers, invites and rewards.
      </p>
      <form onSubmit={signUp}>
        <div className="mb-6">
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
            Create username <span className="text-red-500">*</span>
          </label>
          <input
            type="username"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
            placeholder="username"
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
            Create password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  block w-full p-2.5"
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="flex items-start mt-6 mb-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3"
            />
          </div>
          <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 ">
            Remember me
          </label>
        </div>
        <div className="flex flex-col">
          <button
            className=" text-white bg-black focus:ring-4 focus:outline-none font-bold hover:bg-gray-800 text-sm max-w-full sm:w-auto px-5 py-2.5 text-center"
            type="submit">
            Become our Member
          </button>
          <button className="mt-3 bg-white focus:outline-none font-bold text-sm max-w-full border border-black sm:w-auto px-5 py-2.5 text-center">
            Sign In
          </button>
        </div>
      </form>
    </div>
  )
}

export default SignUpFrom
