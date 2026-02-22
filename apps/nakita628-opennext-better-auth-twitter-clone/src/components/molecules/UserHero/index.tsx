import Image from 'next/image'
import { Avatar } from '@/components/atoms/Avatar'

type Props = {
  coverImage?: string | null
  profileImage?: string | null
}

export function UserHero({ coverImage, profileImage }: Props) {
  return (
    <div>
      <div className='bg-neutral-700 h-44 relative'>
        {coverImage && <Image src={coverImage} alt='Cover' fill className='object-cover' />}
        <div className='absolute -bottom-16 left-4'>
          <Avatar src={profileImage || '/images/placeholder.png'} isLarge hasBorder />
        </div>
      </div>
    </div>
  )
}
