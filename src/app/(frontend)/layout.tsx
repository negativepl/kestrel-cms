import React from 'react'

export const metadata = {
  title: 'Kestrel CMS',
  description: 'Content Management System for Kestrel Store',
}

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  )
}
