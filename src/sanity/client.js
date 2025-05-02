import { createClient } from "@sanity/client"

const client = createClient({
  projectId: "re8070br",
  dataset: "production",
  apiVersion: "2025-04-04",
  useCdn: false,
})

export default client
