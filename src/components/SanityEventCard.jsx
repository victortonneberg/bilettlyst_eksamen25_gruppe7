export default function SanityEventCard({ event }) {
  return (
    <article className="event-card">
      <h3>{event.title}</h3>
      <p>Ticketmaster ID: {event.apiId}</p>
      <p>Kategori: {event.category}</p>
    </article>
  )
}
