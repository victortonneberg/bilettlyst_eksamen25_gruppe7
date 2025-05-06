import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';

export default function CategoryCardVenue({ venue }) {
    return (
        <article className="venueCard">
            <img src={venue.image} alt={venue.name} />
                  <FontAwesomeIcon icon={faStar} style={{ color: 'black' }} />
            <h3>{venue.name}</h3>
            <p>{venue.address}</p>
            <p>{venue.city}</p>
        </article>
    );
}