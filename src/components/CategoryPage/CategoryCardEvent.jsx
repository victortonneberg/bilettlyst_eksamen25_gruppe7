import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';

export default function CategoryCardEvent({ event }) {
    const formattedDate = event.date ? new Date(event.date).toLocaleDateString() : "Ukjent dato";
    const formattedTime = event.time ? new Date(`1970-01-01T${event.time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Ukjent tid";
    
    return (
        <article className="eventCard">
            <img src={event.image} alt={event.name} />
            <FontAwesomeIcon icon={faStar} style={{ color: 'black' }} />
            <h3>{event.name}</h3>
            <p>Dato: {formattedDate}</p>
            <p>Tid: {formattedTime}</p>
        </article>
    );
}