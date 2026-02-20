import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

type Props = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) {
    return null
  }

  return (
    <div className='flex items-center justify-center gap-4 py-4 border-b-[1px] border-neutral-800'>
      <button
        type='button'
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className='p-1 rounded-full text-neutral-400 hover:bg-neutral-800 hover:text-white transition disabled:opacity-30 disabled:cursor-not-allowed'
      >
        <BiChevronLeft size={24} />
      </button>
      <span className='text-neutral-400 text-sm'>
        {page} / {totalPages}
      </span>
      <button
        type='button'
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className='p-1 rounded-full text-neutral-400 hover:bg-neutral-800 hover:text-white transition disabled:opacity-30 disabled:cursor-not-allowed'
      >
        <BiChevronRight size={24} />
      </button>
    </div>
  )
}
