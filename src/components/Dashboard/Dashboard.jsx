import { useEffect, useState } from "react"
import "./../assets/styles/Dashboard/Dashboard.scss"
import { fetchEvents } from "../../sanity/fetchEvents"
import { fetchUsers } from "../../sanity/fetchUsers"
import SanityUserCard from "../Dashboard/SanityUserCard"
import SanityEventCard from "../Dashboard/SanityEventCard"

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [events, setEvents] = useState([])
  const [users, setUsers] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoggedIn(true)
  }

  const getEvents = async () => {
    const data = await fetchEvents()
    console.log("SanityEvents: ", data)
    setEvents(data)
  }

  const getUsers = async () => {
    const data = await fetchUsers()
    console.log("SanityUsers: ", data)
    setUsers(data)
  }

  useEffect(() => {
    getEvents()
    getUsers()
  }, [])

  return (
    <>
      {!isLoggedIn ? (
        <section id="loginform">
          <h1>Dashboard</h1>
          <form onSubmit={handleSubmit}>
            <h2>Logg inn</h2>
            <label>
              Brukernavn
              <input type="text" name="username" placeholder="victorto" />
            </label>
            <input
              type="submit"
              value="Logg inn"
              className="submitbutton"
            ></input>
          </form>
        </section>
      ) : (
        <>
          <h1>Min side</h1>
          <section className="SanityEventCard">
            <h2>Alle events</h2>
            {events?.map((event) => (
              <SanityEventCard key={event._id} event={event} />
            ))}
          </section>
          <section className="SanityUserCard">
            <h2>Alle brukere</h2>
            {users?.map((user) => (
              <SanityUserCard key={user._id} user={user} />
            ))}
          </section>
        </>
      )}
    </>
  )
}
