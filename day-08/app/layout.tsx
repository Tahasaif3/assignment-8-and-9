import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Blog Website",
  description: "A blog website built with Next.js and Sanity",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-primary text-primary-foreground">
          <nav className="container mx-auto px-4 py-6">
            <Link href="/" className="text-2xl font-bold">
              Blog Website
            </Link>
          </nav>
        </header>
        {children}
        <footer className="bg-muted mt-12">
          <div className="container mx-auto px-4 py-6 text-center">
            <p>&copy; 2023 Blog Website. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}

