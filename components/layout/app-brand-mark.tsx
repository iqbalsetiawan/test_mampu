import Image from 'next/image'

const BRAND_SRC = '/app-icon.jpeg'

interface AppBrandMarkProps {
  size?: number
  className?: string
}

export function AppBrandMark({ size = 28, className = '' }: AppBrandMarkProps) {
  return (
    <Image
      src={BRAND_SRC}
      alt=""
      width={size}
      height={size}
      className={`rounded-lg object-cover shadow-sm ring-1 ring-zinc-200/80 dark:ring-zinc-700 ${className}`}
      priority
    />
  )
}
