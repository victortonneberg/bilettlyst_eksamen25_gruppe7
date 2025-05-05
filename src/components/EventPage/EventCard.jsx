import { Link } from 'react-router-dom';
import React from 'react';
export default function EventCard({ id,image, name, dates, time, location, info, url }) {
    return(
        <>
        <Link to={`/events/${id}`}>
        <article>
            <img src={image} alt={name} /> 
            <h4>{name}</h4>
            <p>Dato: {dates}</p>
            <p>Tid: {time}</p>
            <p>Sted: {location}</p>
            <p>Info: {info}</p>
            <p>URL: {url}</p>
        <button>Legg til i ønskeliste</button>    
        </article>
        </Link>   
    </>
    )
}

