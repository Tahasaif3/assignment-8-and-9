import createImageUrlBuilder from '@sanity/image-url'
import { client } from "./client"

//@ts-expect-error:error resolved
export const urlForImage = (source) => createImageUrlBuilder(client).image(source)



// import createImageUrlBuilder from '@sanity/image-url'
// import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// import { dataset, projectId } from '../env'

// // https://www.sanity.io/docs/image-url
// const builder = createImageUrlBuilder({ projectId, dataset })

// export const urlFor = (source: SanityImageSource) => {
//   return builder.image(source)
// }
