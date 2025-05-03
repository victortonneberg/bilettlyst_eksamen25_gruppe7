import React, { useEffect, useState } from 'react';

export default function eventPage() {
    const [results, setResults] = useState([]);

    const getData = async () => {
        fetch('https://app.ticketmaster.com/discovery/v2/events.json?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq') 
        //https://app.ticketmaster.com/discovery/v2/events.json?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&countryCode=NO..... Norge
        //https://app.ticketmaster.com/discovery/v2/events.json?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq .....USA
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
            <h3>Festivalpass:</h3>
        <section>
            {results.length > 0 ? (
                <ul>
                    {results.map((event) => (
                        <li key={event.id}>{event.name}</li>
                    ))}
                </ul>
            ) : (
                <p>Ingen events funnet</p>
            )}
        </section>

      
        </>
    )
    
}
