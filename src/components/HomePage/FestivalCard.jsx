import React from "react"
import { Link } from "react-router-dom"


export default function FestivalCard({ event }) {

  const imageUrl = event.images?.[0]?.url

  return (
    <Link to={`/event/${event.id}`} className="festivalCard-Link">
      <article className="festivalCard">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={event.name}
            className="festivalCard-image"
          />
        )}
        <h3>{event.name}</h3>
      </article>
    </Link>
  )
}