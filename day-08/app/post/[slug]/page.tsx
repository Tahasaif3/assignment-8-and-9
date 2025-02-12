import { client } from "@/sanity/lib/client"
import { urlForImage } from "@/sanity/lib/image"
import { PortableText } from "@portabletext/react"
import Image from "next/image"

async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    mainImage,
    body,
    publishedAt
  }`
  return client.fetch(query, { slug })
}

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-muted-foreground mb-4">{new Date(post.publishedAt).toLocaleDateString()}</p>
      <Image
        src={urlForImage(post.mainImage).url() || "/placeholder.svg"}
        alt={post.title}
        width={800}
        height={500}
        className="w-full h-64 object-cover rounded-lg mb-8"
      />
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

