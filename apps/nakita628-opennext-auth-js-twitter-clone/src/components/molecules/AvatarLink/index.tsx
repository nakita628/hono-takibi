import Link from 'next/link'
import { Avatar } from '@/components/atoms/Avatar'

type Props = {
  userId: string
  src: string
  isLarge?: boolean
  hasBorder?: boolean
}

export function AvatarLink({ userId, src, isLarge, hasBorder }: Props) {
  return (
    <Link
      href={`/users/${userId}`}
      className="cursor-pointer hover:opacity-90 transition inline-block"
      onClick={(e) => e.stopPropagation()}
    >
      <Avatar src={src} isLarge={isLarge ?? false} hasBorder={hasBorder ?? false} />
    </Link>
  )
}
