import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';

export default function CategoryCardAttraction({ attraction }) {
  return (
    <article className="attractionCard">
      <img src={attraction.image} alt={attraction.name} />
      <FontAwesomeIcon icon={faStar} style={{ color: 'black' }} />
      <h3>{attraction.name}</h3>
    </article>
  );
}
