import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next'
import { Nav } from '@/components/layout/nav'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
  ),
  title: {
    default: 'Directory',
    template: '%s | Directory',
  },
  description: 'Search, sort, and filter records with related activity.',
  icons: {
    icon: [{ url: '/app-icon.jpeg', type: 'image/jpeg' }],
    apple: [{ url: '/app-icon.jpeg', type: 'image/jpeg', sizes: '180x180' }],
  },
  openGraph: {
    images: ['/app-icon.jpeg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-zinc-50 dark:bg-zinc-950">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var prefers=window.matchMedia('(prefers-color-scheme: dark)').matches;var dark=t==='dark'||((!t||t==='device')&&prefers);document.documentElement.classList.toggle('dark',dark)}catch(e){}})()`,
          }}
        />
        <NuqsAdapter>
          <Nav />
          <div className="flex flex-1 flex-col">{children}</div>
        </NuqsAdapter>
      </body>
    </html>
  )
}
