import Link from "next/link"
import { ArrowRight, ShoppingBag, Book } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-white mb-12 animate-fade-in-down">Explore APIs with Ease</h1>
      </div>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8">
        <Link
          href="/client-side"
          className="group bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 flex items-center"
        >
          <ShoppingBag className="mr-2" />
          Client Side
          <ArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
        <Link
          href="/server-side"
          className="group bg-white text-purple-600 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 flex items-center"
        >
          <Book className="mr-2" />
          Server Side
          <ArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
      </div>
    </main>
  )
}

