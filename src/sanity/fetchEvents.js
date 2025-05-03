import client from "./client"

export async function fetchEvents() {
  const data = await client.fetch(
    `*[_type == "event"] {
    _id,
    title,
    apiId,
    category
}`
  )
  return data
}
