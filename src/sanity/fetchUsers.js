import client from "./client"

export async function fetchUsers() {
  const data = await client.fetch(
    `*[_type == "user"] {
  name,
  _id,
  "imageUrl": profileImage.asset->url,
  wishlist[]->{title, _id, apiId},
  previousPurchases[]->{title, _id, apiId}
}`
  )
  return data
}
