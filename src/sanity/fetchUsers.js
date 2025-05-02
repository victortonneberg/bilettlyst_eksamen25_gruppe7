import client from "./client"

export async function fetchUsers() {
  const data = await client.fetch(
    `*[_type == "user"] {
    _id,
    name,
    profileImage,
    wishlist[]->{title, _id},
    previousPurchases[]->{title, _id}
}`
  )
  return data
}
