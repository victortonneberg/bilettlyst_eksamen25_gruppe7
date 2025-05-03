export default function CategoryCardAttraction({ attraction}) {
  return (
    <article className="attraction-card">
     
        <img src={attraction.image} alt={attraction.name} />
        <h3>{attraction.name}</h3>    
    </article>
  );
}
