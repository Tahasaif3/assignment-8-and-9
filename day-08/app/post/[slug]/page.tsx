import { client } from "@/sanity/lib/client"
import { urlForImage } from "@/sanity/lib/image"
import { PortableText } from "@portabletext/react"
import Image from "next/image"

// Define proper types for the post
interface Post {
  title: string
  mainImage: any
  body: any
  publishedAt: string
}

// Define params type
type Params = {
  slug: string
}

// Fetch the post based on slug
async function getPost(params: Params): Promise<Post | null> {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    mainImage,
    body,
    publishedAt
  }`
  return client.fetch(query, { slug: params.slug })
}

// Make the component accept Promise<Params>
export default async function Post({
  params,
}: {
  params: Promise<Params> | Params
}) {
  // Resolve the params promise
  const resolvedParams = await Promise.resolve(params)

  // Fetching post data based on the slug
  const post = await getPost(resolvedParams)

  if (!post) {
    return <p className="text-center text-red-500">Post not found</p>
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-muted-foreground mb-4">{new Date(post.publishedAt).toLocaleDateString()}</p>
      {post.mainImage && (
        <Image
          src={urlForImage(post.mainImage).url() || "/placeholder.svg"}
          alt={post.title}
          width={800}
          height={500}
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
      )}
      <div className="prose prose-lg dark:prose-invert">
        <PortableText
          value={post.body}
          components={{
            types: {
              image: ({ value }) => (
                <Image
                  src={urlForImage(value).url() || "/placeholder.svg"}
                  alt={value.alt || ""}
                  width={800}
                  height={500}
                  className="w-full h-auto rounded-lg my-8"
                />
              ),
            },
          }}
        />
      </div>
    </article>
  )
}

// Update generateStaticParams to return Promise
export async function generateStaticParams(): Promise<Params[]> {
  const query = `*[_type == "post"]{slug}`
  const posts = await client.fetch(query)

  return posts.map((post: { slug: { current: string } }) => ({
    slug: post.slug.current,
  }))
}

