"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Loading from "../components/loading"
import { ShoppingCart } from "lucide-react"

interface Product {
  id: number
  title: string
  price: number
  description: string
  image: string
}

export default function ClientSide() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <Loading />

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">Products (Client-side)</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <Link
            href={`/client-side/${product.id}`}
            key={product.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:scale-105"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-64 object-contain p-4"
              />
              <div className="absolute top-0 right-0 bg-indigo-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
                ${product.price.toFixed(2)}
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white truncate">{product.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 h-12 overflow-hidden">{product.description}</p>
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 flex items-center justify-center w-full">
                <ShoppingCart className="mr-2" size={18} />
                View Details
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

