import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'  // Update this line

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Osgood Zero',
  description: 'Your intelligent companion for legal research and analysis',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-[#111528] text-white">
          {children}
        </main>
      </body>
    </html>
  )
}