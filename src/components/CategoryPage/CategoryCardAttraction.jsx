import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStar as faSolidStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faRegularStar } from "@fortawesome/free-regular-svg-icons";

export default function CategoryCardAttraction({
  attraction,
  isFavourite,
  toggleFavourite,
}) {
  return (
    <article className="festivalCard">
      <img
        src={attraction.image}
        alt={"Bilde ikke funnet:  " + attraction.name}
      />
      <button
        onClick={() => toggleFavourite(attraction.id)}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <FontAwesomeIcon
          icon={isFavourite ? faSolidStar : faRegularStar}
          style={{ color: isFavourite ? "gold" : "black" }}
        />
      </button>
      <h3>{attraction.name}</h3>
    </article>
  );
}
