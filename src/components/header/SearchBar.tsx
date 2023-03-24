import { ChangeEvent, FormEvent } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

type SearchBarProps = {
  onSubmit: (event: FormEvent) => void
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

function SearchBar({ onSubmit, value, onChange }: SearchBarProps) {
  return (
    <div className="w-full">
      <form
        className="p-1 h-8 flex align-baseline max-w-auto m-auto rounded-full border-solid border "
        onSubmit={onSubmit}>
        {/* <div> */}
        <input
          className="font-medium bg-transparent border-none font-sans focus:outline-none bg-grey-100"
          type="text"
          placeholder={'Search for items'}
          value={value}
          onChange={onChange}
        />
        {/* </div> */}
        <button type="submit">
          <AiOutlineSearch className="h-8 w-8 p-1 cursor-pointer" size={25} color="white" />
        </button>
      </form>
    </div>
  )
}

export default SearchBar
