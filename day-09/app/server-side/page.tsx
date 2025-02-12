import { Suspense } from "react"
import Loading from "../components/loading"
import { BookOpen, CheckCircle, XCircle } from "lucide-react"

async function getBooks() {
  const res = await fetch("https://simple-books-api.glitch.me/books", { cache: "no-store" })
  if (!res.ok) {
    throw new Error("Failed to fetch books")
  }
  return res.json()
}

interface Book {
  id: number
  name: string
  type: string
  available: boolean
}

async function BookList() {
  const books = await getBooks()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {books.map((book: Book, index: number) => (
        <div
          key={book.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:scale-105"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">{book.name}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4 flex items-center">
              <BookOpen className="mr-2" size={18} />
              {book.type}
            </p>
            <p className={`font-bold flex items-center ${book.available ? "text-green-500" : "text-red-500"}`}>
              {book.available ? (
                <>
                  <CheckCircle className="mr-2" size={18} />
                  Available
                </>
              ) : (
                <>
                  <XCircle className="mr-2" size={18} />
                  Not Available
                </>
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ServerSide() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">Books (Server-side)</h1>
      <Suspense fallback={<Loading />}>
        <BookList />
      </Suspense>
    </div>
  )
}

