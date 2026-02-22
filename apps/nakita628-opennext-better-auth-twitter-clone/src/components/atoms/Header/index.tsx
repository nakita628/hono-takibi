import { BiArrowBack } from 'react-icons/bi'

type Props = {
  label: string
  showBackArrow?: boolean
  onBack?: () => void
}

export function Header({ label, showBackArrow, onBack }: Props) {
  return (
    <div className='border-b border-neutral-800 p-5'>
      <div className='flex flex-row items-center gap-2'>
        {showBackArrow && (
          <button
            type='button'
            onClick={onBack}
            className='text-white cursor-pointer hover:opacity-70 transition'
          >
            <BiArrowBack size={24} />
          </button>
        )}
        <h1 className='text-2xl font-bold text-white'>{label}</h1>
      </div>
    </div>
  )
}
