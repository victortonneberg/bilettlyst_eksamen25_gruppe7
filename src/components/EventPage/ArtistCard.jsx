export default function ArtistCard({ image, name }) {
  return (
    <article className="festivalCard">
      {/* Artist bildene */}
      <img src={image} alt={name} />
      <p>{name}</p>
    </article>
  );
}
