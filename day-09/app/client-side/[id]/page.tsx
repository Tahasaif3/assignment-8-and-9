"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Loading from "../../components/loading"
import { ShoppingCart, ArrowLeft, Star } from "lucide-react"
import Link from "next/link"

interface Product {
  id: number
  title: string
  price: number
  description: string
  image: string
  category: string
  rating: {
    rate: number
    count: number
  }
}

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data)
        setLoading(false)
      })
  }, [id])

  if (loading) return <Loading />

  if (!product) return <div>Product not found</div>

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/client-side"
        className="inline-flex items-center mb-6 text-indigo-600 hover:text-indigo-800 transition duration-300"
      >
        <ArrowLeft className="mr-2" size={20} />
        Back to Products
      </Link>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-96 w-full object-contain md:w-96 p-8"
              src={product.image || "/placeholder.svg"}
              alt={product.title}
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{product.category}</div>
            <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {product.title}
            </h1>
            <div className="mt-4 flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.round(product.rating.rate) ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                  />
                ))}
              </div>
              <p className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                {product.rating.rate} ({product.rating.count} reviews)
              </p>
            </div>
            <p className="mt-4 text-xl font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</p>
            <p className="mt-4 text-gray-600 dark:text-gray-300">{product.description}</p>
            <div className="mt-8">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 flex items-center justify-center">
                <ShoppingCart className="mr-2" size={20} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

