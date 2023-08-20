import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/navbar/navbar'
import Footer from '@/components/footer/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Algo Master',
  description: 'Algo Master is a platform for learning algorithms and data structures.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
      {children}
        <Footer />
      </body>
    </html>
  )
}
