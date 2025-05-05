import "../../assets/styles/Dashboard/SanityUserCard.scss"
import { Link } from "react-router-dom"

export default function SanityUserCard({ user }) {
  return (
    <article className="user-card">
      <h3>{user.name}</h3>
      <img src={user.imageUrl} alt={`Profilbilde av: ${user.name}`}></img>
      <p>Ønskeliste: {user.wishlist?.length ?? 0}</p>
      <ul>
        {user.wishlist?.map((event) => (
          <li key={event._id}>
            <Link to={`/sanity-event/${event.apiId}`}>{event.title}</Link>
          </li>
        ))}
      </ul>
      <p>Tidligere kjøp: {user.previousPurchases?.length ?? 0}</p>
      <ul>
        {user.previousPurchases?.map((event) => (
          <li key={event._id}>
            <Link to={`/sanity-event/${event.apiId}`}>{event.title}</Link>
          </li>
        ))}
      </ul>
    </article>
  )
}
