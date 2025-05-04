export default function CategoryCardVenue({ venue }) {
    return (
        <article className="venueCard">
            <img src={venue.image} alt={venue.name} />
            <h3>{venue.name}</h3>
            <p>{venue.address}</p>
            <p>{venue.city}</p>
        </article>
    );
}