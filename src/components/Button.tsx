import React from 'react'

function Button({ buttonText }: { buttonText: string }) {
  return (
    <button
      className="mt-3 text-white bg-black focus:ring-4 focus:outline-none font-bold hover:bg-gray-800 text-sm max-w-full sm:w-auto text-center"
      type="submit">
      {buttonText}
    </button>
  )
}

export default Button
