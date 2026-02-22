import { FollowBar } from '@/components/organisms/FollowBar'
import { Sidebar } from '@/components/organisms/Sidebar'

type Props = {
  children: React.ReactNode
}

export function MainLayout({ children }: Props) {
  return (
    <div className='h-screen bg-black'>
      <div className='container h-full mx-auto xl:px-30 max-w-6xl'>
        <div className='grid grid-cols-4 h-full'>
          <Sidebar />
          <div className='col-span-3 lg:col-span-2 border-x border-neutral-800 overflow-y-auto scrollbar-hide'>
            {children}
          </div>
          <FollowBar />
        </div>
      </div>
    </div>
  )
}
