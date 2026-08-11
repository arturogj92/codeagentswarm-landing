import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} ${inter.variable} bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}
