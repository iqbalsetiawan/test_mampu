import Link from 'next/link'
import { AppBrandMark } from './app-brand-mark'
import { ThemeToggle } from './theme-toggle'

export function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/users"
          className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950"
        >
          <AppBrandMark size={28} />
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Directory</span>
        </Link>

        <div className="ml-auto flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
