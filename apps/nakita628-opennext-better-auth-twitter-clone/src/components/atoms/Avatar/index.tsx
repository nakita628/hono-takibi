import Image from 'next/image'

type Props = {
  src: string
  alt?: string
  isLarge?: boolean
  hasBorder?: boolean
}

export function Avatar({ src, alt = 'Avatar', isLarge, hasBorder }: Props) {
  return (
    <div
      className={`
        ${hasBorder ? 'border-4 border-black' : ''}
        ${isLarge ? 'h-32 w-32' : 'h-12 w-12'}
        rounded-full
        relative
        overflow-hidden
      `}
    >
      <Image src={src} alt={alt} fill className='object-cover' />
    </div>
  )
}
