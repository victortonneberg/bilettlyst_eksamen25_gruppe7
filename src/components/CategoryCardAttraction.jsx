
export default function CategoryCardAttraction({ segment }) {
    return (
      <article className="categoryCardAttraction">
        <img src={segment.image} alt={segment.name} />
        <h3>{segment.name}</h3>
      </article>
    );
}