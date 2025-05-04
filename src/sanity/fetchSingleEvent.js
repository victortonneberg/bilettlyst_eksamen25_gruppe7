import client from "./client"

export async function fetchSingleEvent(id) {
  const params = { id }
  console.log("Parameter til GROQ:", params)
  const data = await client.fetch(
    `*[_type == "event" && apiId == $id][0] {
      _id,
      title,
      apiId,
      category,
    }`,
    params
  )
  return data
}
