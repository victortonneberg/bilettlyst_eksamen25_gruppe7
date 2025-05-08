import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';

export default function CategoryCardEvent({ event, isFavourite, toggleFavourite }) {
  
    return (
        <article className="eventCard">
            <img src={event.image} alt={"Bilde ikke funnet:  " + event.name} />
            <button 
                onClick={() => toggleFavourite(event.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <FontAwesomeIcon 
                    icon={isFavourite ? faSolidStar : faRegularStar} 
                    style={{ color: isFavourite ? 'gold' : 'black' }} />
            </button>
            <h3>{event.name}</h3>
            <p>{event.date}</p>
            <p>{event.time}</p>
            <p>{event.country}</p>
            <p>{event.city}</p>
            <p>{event.venue}</p>
        </article>
    );
}