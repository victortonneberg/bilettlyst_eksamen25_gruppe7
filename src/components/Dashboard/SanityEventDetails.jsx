import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchSingleEvent } from "../../sanity/fetchSingleEvent"

export default function SanityEventDetails() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [ticketmasterData, setTicketmasterData] = useState(null)

  useEffect(() => {
    console.log("apiId fra URL", id)

    async function getSingleEvent() {
      const data = await fetchSingleEvent(id)
      console.log(data)
      setEvent(data)
    }
    getSingleEvent()
  }, [id])

  useEffect(() => {
    fetch(
      `https://app.ticketmaster.com/discovery/v2/events/${id}?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&locale=*`
    )
      .then((response) => response.json())
      .then((data) => console.log("fetchAPI", data))
      .catch((error) => console.log("Feil under fetch fra TM: ", error))
  }, [id])

  if (!event) {
    return <p>Arrangementet finnes ikke....</p>
  }

  return (
    <>
      <h1>{event.title}</h1>
      <p>{event.category}</p>
    </>
  )
}
