import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EventCard from './eventCard'; 
import ArtistCard from './ArtistCard';


export default function EventPage() {
    const [results, setResults] = useState([]);




    

    const getData = async () => {
        fetch('https://app.ticketmaster.com/discovery/v2/events.json?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq')
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
    
            if (data._embedded && data._embedded.events) {
              setResults(data._embedded.events);
            } else {
              console.log("Ingen events funnet");
            }
          })
          .catch((error) => {
            console.log("Feil ved henting av data: ", error);
          });
      };

useEffect(() => {
    getData();
}, []);


    return (
        <>
        <header>
            <h1>Lim Inn Header her</h1>
        </header>
        <h2>Findings Festival</h2>
            <nav>
                <ul>
                    <p>Sjanger:</p>
                    <li><a href="/sjanger/1">Music</a></li>
                    <li><a href="/sjanger/2">Undefined</a></li>
                    <li><a href="/sjanger/3">Festival</a></li>
                    <li><a href="/sjanger/4">Undefined</a></li>
                </ul>
            </nav>
            <p>Følg oss på sosiale medier:</p>
            <h3>Festival-pass:</h3>


{/*Festival kort  */}

        <section>
            {results.length > 0 ? (
                results.map((event) => (
                    <EventCard
                        key={event.id}
                        id={event.id}
                        name={event.name}
                        image={event.images[0]?.url}
                        dates={event.dates.start.localDate}
                        location={event._embedded.venues[0]?.name}
                    />
                ))
            ) : (
                <p>Ingen events funnet</p>
            )}
        </section>


        <h3>Artister:</h3>


{/*Artist kort  */}

        {results.length > 0 ? (
                results.map((event) => (
                    <ArtistCard
                    key={event.id}
                    name={event._embedded?.attractions?.[0]?.name}
                    image={event._embedded?.attractions?.[0]?.images?.[0]?.url || event.images[0]?.url}
                />
                ))
            ) : (
                <p>Ingen artister funnet</p>
            )}





        </>
    )
    
}
