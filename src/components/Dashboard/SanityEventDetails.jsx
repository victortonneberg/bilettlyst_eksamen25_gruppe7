import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchSingleEvent } from "../../sanity/fetchSingleEvent"

export default function SanityEventDetails() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [ticketmasterData, setTicketmasterData] = useState(null)

  const getSanityEvent = () => {
    fetchSingleEvent(id)
      .then(setEvent)
      .catch((error) =>
        console.log("Feil ved henting av event fra Sanity: ", error)
      )
  }

  const getTicketmasterData = () => {
    fetch(
      `https://app.ticketmaster.com/discovery/v2/events/${id}?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&locale=*`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("TM response: ", data)
        setTicketmasterData(data)
      })
      .catch((error) => console.log("Feil under fetch fra TM: ", error))
  }

  useEffect(() => {
    getSanityEvent()
    getTicketmasterData()
  }, [id])

  if (!event) {
    return <p>Arrangementet finnes ikke....</p>
  }

  return (
    <>
      <h1>{event.title}</h1>
      <section className="date-place">
        <h2>Dato og sted</h2>
        <p>Dato: {ticketmasterData?.dates?.start?.localDate}</p>
        <p>Sted: {ticketmasterData?._embedded?.venues?.[0].name}</p>
      </section>
      <section className="genreEvent">
        <h2>Sjanger</h2>
        {ticketmasterData?.classifications?.map((item, index) => (
          <p key={index}>{item.segment?.name}</p>
        ))}
      </section>
    </>
  )
}
