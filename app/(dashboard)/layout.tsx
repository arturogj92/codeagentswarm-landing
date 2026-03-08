import { Inter } from 'next/font/google'
import '../globals.css'

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
