import { BsTwitter } from 'react-icons/bs'

type Props = {
  onClick?: () => void
}

export function SidebarLogo({ onClick }: Props) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='rounded-full h-14 w-14 p-4 flex items-center justify-center hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer transition'
    >
      <BsTwitter size={28} color='#0EA5E9' />
    </button>
  )
}
