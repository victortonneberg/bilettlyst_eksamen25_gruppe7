import { Link } from "react-router-dom";

export default function EventCard({ id, image, name, dates, time, location, info, url }) {
    return(
        <>
        <article>
                <img src={image} alt={name} /> 
                <h4>{name}</h4>
                <p>Dato: {dates}</p>
                <p>Tid: {time}</p>
                <p>Sted: {location}</p>
                <p>Info: {info}</p>
                <p>URL:????? {}</p>
            {url && (
            <a href={url} target="_blank">Kjøp billetter</a>
        )}
            <button>Legg til i ønskeliste</button>   
        </article>
        </>
    )
}

