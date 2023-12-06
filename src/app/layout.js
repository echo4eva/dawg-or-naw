import { Comic_Neue } from 'next/font/google'
import './globals.css'

const comic = Comic_Neue({ 
  weight: "400",
  subsets: ['latin'] 
})

export const metadata = {
  title: 'Dawg Or Naw',
  description: 'Does the picture have that dawg in them or naw?',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={comic.className}>{children}</body>
    </html>
  )
}
