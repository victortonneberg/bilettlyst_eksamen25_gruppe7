import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchSingleEvent } from "../../sanity/fetchSingleEvent"

export default function SanityEventDetails() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)

  useEffect(() => {
    console.log("apiId fra URL", id)

    async function getSingleEvent() {
      const data = await fetchSingleEvent(id)
      console.log(data)
      setEvent(data)
    }
    getSingleEvent()
  }, [id])

  if (!event) {
    return <p>Laster data...</p>
  }

  return (
    <>
      <h1>{event.title}</h1>
      <p>{event.category}</p>
    </>
  )
}
