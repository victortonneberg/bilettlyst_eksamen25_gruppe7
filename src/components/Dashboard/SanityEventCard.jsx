import { Link } from "react-router-dom"

export default function SanityEventCard({ event }) {
  return (
    <article className="event-card">
      <Link to={`/sanity-event/${event.apiId}`}>
        <h3>{event.title}</h3>
        <p>Ticketmaster ID: {event.apiId}</p>
        <p>Kategori: {event.category}</p>
      </Link>
    </article>
  )
}
