"use client"

import "./globals.css"
import { Inter } from "next/font/google"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Moon, Sun, Home, ShoppingBag, Book, Menu, X } from "lucide-react"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [darkMode, setDarkMode] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        <nav className="bg-white dark:bg-gray-800 shadow-md">
          <div className="container mx-auto px-6 py-3">
            <div className="flex justify-between items-center">
              <Link
                href="/"
                className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 transition duration-300"
              >
                API Explorer
              </Link>
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  href="/"
                  className="flex items-center hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-300"
                >
                  <Home className="mr-1" size={18} />
                  Home
                </Link>
                <Link
                  href="/client-side"
                  className="flex items-center hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-300"
                >
                  <ShoppingBag className="mr-1" size={18} />
                  Client Side
                </Link>
                <Link
                  href="/server-side"
                  className="flex items-center hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-300"
                >
                  <Book className="mr-1" size={18} />
                  Server Side
                </Link>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300"
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300 mr-2"
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link
                  href="/"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
                >
                  <Home className="inline-block mr-2" size={18} />
                  Home
                </Link>
                <Link
                  href="/client-side"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
                >
                  <ShoppingBag className="inline-block mr-2" size={18} />
                  Client Side
                </Link>
                <Link
                  href="/server-side"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
                >
                  <Book className="inline-block mr-2" size={18} />
                  Server Side
                </Link>
              </div>
            </div>
          )}
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
}

