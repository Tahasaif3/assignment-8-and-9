import { client } from "@/sanity/lib/client"
import { urlForImage } from "@/sanity/lib/image"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

async function getPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    mainImage,
    publishedAt
  }`
  return client.fetch(query)
}

export default async function Home() {
  const posts = await getPosts()

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center animate-fade-in">Welcome to Our Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {posts.map((post: any, index: number) => (
          <Link href={`/post/${post.slug.current}`} key={post._id}>
            <Card
              className="h-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <Image
                  src={urlForImage(post.mainImage).url() || "/placeholder.svg"}
                  alt={post.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-2">{post.title}</CardTitle>
                <p className="text-muted-foreground line-clamp-2">{post.description}</p>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">{new Date(post.publishedAt).toLocaleDateString()}</p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  )
}

