export default function ArtistCard({ image, name}) {
    return(
            <article>
                {/* Artist bildene */}
                <img src={image} alt={name} />
                <p>{name}</p>
            </article>
    )
}