import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EventCard from './EventCard';
import ArtistCard from './ArtistCard';



export default function DetailEventPage() {
    const [event, setEvent] = useState(null);
    const { id } = useParams();
    console.log("useParams-ID:", id)


    useEffect(() => {
       // fetch(`https://app.ticketmaster.com/discovery/v2/events/G5vVZbowlaVz5.json?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq`)
        fetch(`https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq`)
        .then((response) => response.json())
        .then((data) => {
            setEvent(data)
            console.log("Event data:", data)
        })
        .catch((error) => {
            console.log("Feil ved henting av event:", error)
            console.log("EventCard ID:", id)})
    }, [id])
    
    if (!event) return <p>Laster inn eventet....</p>

    return (
        <>
        <header>
            <h1>{event.name}</h1>
            <p>Sjanger:  
                {event.classifications?.[0]?.segment?.name || ""},
                {event.classifications?.[0]?.genre?.name || ""},
                {event.classifications?.[0]?.subGenre?.name || ""}
                </p> 
                
        </header>

        <p>Følg oss på sosiale medier:</p>
        <h3>Festivalpass:</h3>

        <article>
            <EventCard
            id={event?.id || "Ukjent ID"}
            name={event?.name || "Ukjent"}
            image={event?.images?.[0]?.url || "Ukjent bilde"}
            dates={event?.dates?.start?.localDate ?? "Ukjent dato"}
            time={event?.dates?.start?.localTime ?? "Ukjent tid"}
            location={
                event?._embedded?.venues?.[0] ? 
                `${event._embedded.venues[0].name}, 
                ${event._embedded.venues[0].country.name}, 
                ${event._embedded.venues[0].city.name}`: "Ukjent sted"
            }
            info={event?.info || "Ingen info om eventet"}              
            url={event?.url || "Ukjent URL"}
            />    
        </article>
        
    <h3>Artister</h3>
    
    <article>
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


    </>
  );
}
