import React, { useEffect, useState } from 'react';
import EventCard from '../EventPage/EventCard';

export default function Dashboard() {
    const [events, setEvents] = useState([])

    useEffect(() => {
      fetch('https://app.ticketmaster.com/discovery/v2/events.json?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq') 
        .then(response => response.json())
        .then(data => 
            setEvents(data._embedded.events))
        .catch(error => 
            console.error('Feil ved henting av events:', error))
    }, [])
  
    return (
    <section>
        <h1>Home - Eventer</h1>
        <article>
            {events.map(event => (
                <EventCard
                id={event?.id}
                name={event?.name}
                image={event?.images?.[0]?.url}
                dates={event?.dates?.start?.localDate}
                time={event?.dates?.start?.localTime}
                location={
                    event?._embedded?.venues?.[0] ? 
                    `${event._embedded.venues[0].name}, 
                    ${event._embedded.venues[0].country.name}, 
                    ${event._embedded.venues[0].city.name}`: "Ukjent sted"
                }
                info={event?.info}              
                url={event?.url}
            />
          ))}
        </article>
      </section>
    )
}