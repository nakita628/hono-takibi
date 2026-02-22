import type { FormEvent } from 'react'
import { BiSearch } from 'react-icons/bi'

type Props = {
  value: string
  onChange: (value: string) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export function SearchBar({ value, onChange, onSubmit }: Props) {
  return (
    <form onSubmit={onSubmit} className='relative'>
      <input
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='Search posts and users'
        className='w-full rounded-full bg-neutral-800 px-4 py-2 pl-10 text-sm text-white placeholder:text-neutral-500 outline-none focus:ring-2 focus:ring-sky-500'
      />
      <BiSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500' size={18} />
    </form>
  )
}
