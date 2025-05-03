export default function CategoryCardEvent({ segment }) {
    const formattedDate = segment.date ? new Date(segment.date).toLocaleDateString() : "Ukjent dato";
    const formattedTime = segment.time ? new Date(`1970-01-01T${segment.time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Ukjent tid";
    
    return (
        <article className="categoryCardEvent">
        <img src={segment.image} alt={segment.name} />
        <h3>{segment.name}</h3>
        <p>Dato: {formattedDate}</p>
        <p>Tid: {formattedTime}</p>
        </article>
    );
}