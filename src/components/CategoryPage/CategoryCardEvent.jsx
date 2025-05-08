import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faSolidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faRegularStar } from "@fortawesome/free-regular-svg-icons";

export default function CategoryCardEvent({
  event,
  isFavourite,
  toggleFavourite,
}) {
  const formattedDate = event.date
    ? new Date(event.date).toLocaleDateString()
    : "Ukjent dato";
  const formattedTime = event.time
    ? new Date(`1970-01-01T${event.time}`).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Ukjent tid";

  return (
    <article className="eventCard">
      <img src={event.image} alt={"Bilde ikke funnet:  " + event.name} />
      <button
        onClick={() => toggleFavourite(event.id)}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <FontAwesomeIcon
          icon={isFavourite ? faSolidStar : faRegularStar}
          style={{ color: isFavourite ? "gold" : "black" }}
        />
      </button>
      <h3>{event.name}</h3>
      <p>{event.date}</p>

      <p>Dato: {formattedDate}</p>
      <p>Tid: {formattedTime}</p>
    </article>
  );
}
