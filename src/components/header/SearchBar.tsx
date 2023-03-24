// import { ChangeEvent, FormEvent } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

// type SearchBarProps = {
//   onSubmit: (event: FormEvent) => void
//   value: string
//   onChange: (event: ChangeEvent<HTMLInputElement>) => void
// }

function SearchBar() {
  return (
    // <div className="w-full">
    //   <form
    //     className="p-1 h-8 flex align-baseline max-w-auto m-auto rounded-full border-solid border "
    //     onSubmit={onSubmit}>
    //     {/* <div> */}
    //     <input
    //       className="font-medium bg-transparent border-none font-sans focus:outline-none bg-grey-100"
    //       type="text"
    //       placeholder={'Search for items'}
    //       value={value}
    //       onChange={onChange}
    //     />
    //     {/* </div> */}
    //     <button type="submit">
    //       <AiOutlineSearch className="h-8 w-8 p-1 cursor-pointer" size={25} color="white" />
    //     </button>
    //   </form>
    // </div>
    <div className="bg-gray-200 rounded-full flex items-center px-2 w-full order-1 lg:order-none lg:w-[500px] ">
      <AiOutlineSearch size={20} />
      <input
        className="bg-transparent p-2 focus:outline-none w-full"
        type="text"
        placeholder="Search Products"
      />
    </div>
  )
}

export default SearchBar
