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

  // Må føst fetche event, basert på id.
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
              }}
            />
          ))
        ) : (
          <p>Ingen festivalpass funnet.</p>
        )}
      </section>
    </>
  );
}
