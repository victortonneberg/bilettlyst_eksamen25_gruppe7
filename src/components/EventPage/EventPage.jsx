import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventCard from "../SharedComponents/EventCard";
import ArtistCard from "./ArtistCard";

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [festivalEvents, setFestivalEvents] = useState([]);
  const festivalNames = [
    "Findings Festival 2025",
    "NEON |",
    "Skeikampenfestivalen",
    "Tons of Rock",
  ];

  // Må først fetche event, basert på id.
  useEffect(() => {
    if (id) {
      fetch(
        `https://app.ticketmaster.com/discovery/v2/events/${id}?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&locale=*`
      )
        .then((response) => response.json())
        .then((data) => {
          setEvent(data);
          console.log("Hovedevent data:", data);
        })
        .catch((error) => {
          console.log("Feil ved henting av hovedevent:", error);
        });
    }
  }, [id]);

  // Henter alle attractions, fordi det er her festivalpassene ligger.
  useEffect(() => {
    if (event && event._embedded?.attractions?.length > 0) {
      const festivalName = event._embedded.attractions[0]?.name;

      fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&keyword=${festivalName}&locale=*&size=6&countryCode=NO`
      )
        .then((response) => response.json())
        .then((data) => {
          setFestivalEvents(data._embedded?.events || []);
          console.log("FestivalPass:", data);
        })
        .catch((error) =>
          console.log("Feil ved henting av festivalpass:", error)
        );
    }
  }, [event]);

  if (!event) return <p>Laster inn eventet....</p>;

  return (
    <>
      <article id="eventHeader">
        <h1>{event._embedded.attractions[0]?.name}</h1>
        <p>
          Sjanger: {event.classifications?.[0]?.segment?.name || ""},{" "}
          {event.classifications?.[0]?.genre?.name || ""},{" "}
          {event.classifications?.[0]?.subGenre?.name || ""}
        </p>
        <p>Følg oss på sosiale medier: </p>
        {event._embedded?.attractions?.[0]?.externalLinks && (
          <section className="socials">
            {event._embedded.attractions[0].externalLinks.spotify?.[0]?.url && (
              <p>
                <a
                  href={
                    event._embedded.attractions[0].externalLinks.spotify[0].url
                  }
                  target="_blank"
                >
                  Spotify
                </a>
              </p>
            )}
            {event._embedded.attractions[0].externalLinks.instagram?.[0]
              ?.url && (
              <p>
                <a
                  href={
                    event._embedded.attractions[0].externalLinks.instagram[0]
                      .url
                  }
                  target="_blank"
                >
                  Instagram
                </a>
              </p>
            )}
            {event._embedded.attractions[0].externalLinks.homepage?.[0]
              ?.url && (
              <p>
                <a
                  href={
                    event._embedded.attractions[0].externalLinks.homepage[0].url
                  }
                  target="_blank"
                >
                  Hjemmeside
                </a>
              </p>
            )}
          </section>
        )}
      </article>
      <h2>Festivalpass</h2>
      <section className="festivals-grid">
        {festivalEvents.length > 0 ? (
          festivalEvents.map((pass) => (
            <EventCard
              key={pass.id}
              event={{
                id: pass.id,
                name: pass.name,
                image: pass.images?.[0]?.url,
                date: pass.dates?.start?.localDate,
                time: pass.dates?.start?.localTime,
                venue: pass._embedded?.venues?.[0]?.name,
                city: pass._embedded?.venues?.[0]?.city?.name,
                country: pass._embedded?.venues?.[0]?.country?.name,
              }}
              showFestivalPassButtons={true}
              showFestivalDetails={true}
            />
          ))
        ) : (
          <p>Ingen festivalpass funnet.</p>
        )}
      </section>
      <h3>Artister</h3>
      <section id="artistCardContainer">
        <article id="eventArtistCard">
          {event._embedded?.attractions?.length > 0 ? (
            event._embedded.attractions.map((artist) => (
              <ArtistCard
                key={artist?.id || "Ukjent artist ID"}
                name={artist?.name || "Ukjent artist"}
                image={artist?.images?.[0]?.url || "Ukjent artist bilde"}
              />
            ))
          ) : (
            <p>Ingen artister funnet</p>
          )}
        </article>
      </section>
    </>
  );
}
