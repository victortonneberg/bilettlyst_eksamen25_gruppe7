import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchSingleEvent } from "../../sanity/fetchSingleEvent"
import { fetchUsers } from "../../sanity/fetchUsers"
import "../../assets/styles/Dashboard/SanityEventDetails.scss"

export default function SanityEventDetails() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [ticketmasterData, setTicketmasterData] = useState(null)
  const [users, setUsers] = useState([])

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

  const getUsers = () => {
    fetchUsers()
      .then(setUsers)
      .catch((error) =>
        console.log("Feil ved henting av users fra Sanity: ", error)
      )
  }

  useEffect(() => {
    getSanityEvent()
    getTicketmasterData()
    getUsers()
  }, [id])

  if (!event) {
    return <p>Arrangementet finnes ikke....</p>
  }

  // Kilde for .some: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
  const addedInWishlist = users.filter((user) =>
    user.wishlist?.some((wishlistItem) => wishlistItem.apiId === id)
  )

  console.log("Ønskeliste:", addedInWishlist)
  console.log("Users: ", users)

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
      <section className="inWishlist">
        <h2>Andre med dette arrangementet i ønskelisten</h2>
        <ul>
          {addedInWishlist.map((user) => (
            <li key={user._id}>
              <img
                src={user.imageUrl}
                alt={user.name}
                width="100" /*KORRIGER I SCSS!*/
              ></img>
              <p>{user.name}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
