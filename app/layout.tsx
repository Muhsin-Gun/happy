import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Happy Birthday Sabriin ❤️',
  description: 'A special birthday surprise for the most amazing person',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="heart-cursor">{children}</body>
    </html>
  )
}
