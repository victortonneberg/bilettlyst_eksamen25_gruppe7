import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faSolidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faRegularStar } from "@fortawesome/free-regular-svg-icons";
import "../../assets/styles/SharedComponents/EventCard.scss";

export default function EventCard({
  event,
  showTicketMasterInfo = true,
  showSanityInfo = false,
  showDetails = false,
  showFavouriteButton = false,
  isFavourite = false,
  toggleFavourite,
}) {
  return (
    <article className="festivalCard">
      {showTicketMasterInfo && (
        <img src={event.image} alt={"Bilde ikke funnet:  " + event.name} />
      )}

      {/* Viser kun ønskeliste-button hvis prop showFavouriteButton={true} */}
      {showFavouriteButton && (
        <button
          onClick={() => toggleFavourite(event.id)}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <FontAwesomeIcon
            icon={isFavourite ? faSolidStar : faRegularStar}
            style={{ color: isFavourite ? "gold" : "black" }}
          />
        </button>
      )}

      {showTicketMasterInfo && <h3>{event.name}</h3>}

      {/* Viser kun ønskeliste-button hvis prop showDetails={true} */}
      {showDetails && (
        <>
          <p>Dato: {event.date}</p>
          <p>Tid: {event.time}</p>
        </>
      )}

      {/* Viser kun Sanity-data hvis prop showSanityInfo={true} */}
      {showSanityInfo && <h3>{event.title}</h3>}
    </article>
  );
}
