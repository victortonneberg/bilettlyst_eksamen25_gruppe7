import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EventCard from './EventCard';
import ArtistCard from './ArtistCard';



export default function DetailEventPage() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [festivalEvents, setFestivalEvents] = useState([]);
    const festivalNames = ["Findings Festival 2025", "NEON |", "Skeikampenfestivalen", "Tons of Rock"];
    console.log("useParams-ID:", id)

    useEffect(() => {
        const fetchAllEvents = async () => {
            const fetchedEvents = [];
            for (const name of festivalNames) {
                try {
                    const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&keyword=${name}&locale=*&countryCode=NO`);
                    const data = await response.json();
                    console.log(`${name} eventer:`, data);
                    fetchedEvents.push(...(data._embedded?.events || []));
                } catch (error) {
                    console.error(`Feil ved henting av eventer for festivalen ${name}:`, error);
                }
            }
            setFestivalEvents(fetchedEvents);
            console.log("All fetched events:", fetchedEvents);
        };

        fetchAllEvents();
      }, []);

useEffect(() => {
    if (id) { 
        fetch(`https://app.ticketmaster.com/discovery/v2/events/${id}?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&locale=*`)
            .then((response) => response.json())
            .then((data) => {
                setEvent(data);
                console.log("Event data:", data);
            })
            .catch((error) => {
                console.log("Feil ved henting av hovedevent:", error);
                console.log("EventCard ID:", id);
            });
    }
}, [id]);
    
    if (!event) return <p>Laster inn eventet....</p>

    return (
        <>
            <article id="eventHeader">
                <h1>{event.name}</h1>
                <p>Sjanger: {" "} 
                    {event.classifications?.[0]?.segment?.name || ""},{" "}
                    {event.classifications?.[0]?.genre?.name || ""},{" "}
                    {event.classifications?.[0]?.subGenre?.name || ""}
                </p> 
                <p>Følg oss på sosiale medier:{" "}</p>
                <h3>Festivalpass:</h3>
            </article>


    <section id="eventCardContainer">
        <article className="eventDetailCard">
            {festivalEvents?.length === 0 ? (
                <p>Ingen festivaler funnet</p>
            ) : (
                festivalEvents.map((festivalEvent) => (
                    <EventCard
                        key={festivalEvent.id}
                        id={festivalEvent?.id}
                        name={festivalEvent.name}
                        image={festivalEvent?.images?.[0]?.url || "Ukjent bilde"}
                        dates={festivalEvent?.dates?.start?.localDate ?? "Ukjent dato"}
                        time={festivalEvent?.dates?.start?.localTime ?? "Ukjent tid"}
                        location={
                            festivalEvent?._embedded?.venues?.[0] ? 
                            `${festivalEvent._embedded.venues[0].name}, 
                            ${festivalEvent._embedded.venues[0].country.name}, 
                            ${festivalEvent._embedded.venues[0].city.name}`: "Ukjent sted"
                        }
                        info={festivalEvent?.info || "Ingen info om eventet"}              
                        url={festivalEvent?.url || "Ukjent URL"}
                    />
                ))
            )}
        </article>
            </section>


            <section id="eventCardContainer">
                <article className="eventDetailCard">
                    <EventCard
                        id={event?.id || "Ukjent ID"}
                        name={event?.name || "Ukjent"}
                        image={event?.images?.[0]?.url || "Ukjent bilde"}
                        dates={event?.dates?.start?.localDate ?? "Ukjent dato"}
                        time={event?.dates?.start?.localTime ?? "Ukjent tid"}
                        location={
                            event?._embedded?.venues?.[0]
                                ? `${event._embedded.venues[0].name}, ${event._embedded.venues[0].country.name}, ${event._embedded.venues[0].city.name}`
                                : "Ukjent sted"
                        }
                        info={event?.info || "Ingen info om eventet"}
                        url={event?.url || "Ukjent URL"}
                    />
                </article>
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