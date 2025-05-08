import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faSolidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faRegularStar } from "@fortawesome/free-regular-svg-icons";

export default function CategoryCardVenue({
  venue,
  isFavourite,
  toggleFavourite,
}) {
  return (
    <article className="festivalCard">
      <img src={venue.image} alt={"Bilde ikke funnet:  " + venue.name} />
      <button
        onClick={() => toggleFavourite(venue.id)}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <FontAwesomeIcon
          icon={isFavourite ? faSolidStar : faRegularStar}
          style={{ color: isFavourite ? "gold" : "black" }}
        />
      </button>
      <h3>{venue.name}</h3>
      <p>{venue.address}</p>
      <p>{venue.city}</p>
    </article>
  );
}
