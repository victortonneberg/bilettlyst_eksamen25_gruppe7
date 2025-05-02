import client from "./client"

export async function fetchSingleEvent(apiId) {
  const params = { apiId }
  const data = await client.fetch(
    `*[_type == "event" && apiId == $apiId][0] {
      _id,
      title,
      apiId,
      category,
    }`,
    params
  )
  return data
}
