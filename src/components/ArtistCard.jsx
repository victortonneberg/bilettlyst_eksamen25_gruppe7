export default function ArtistCard({ image, name}) {
    return(
            <article>
                <img src={image} alt={name} />
                <p>{name}</p>
            </article>
    )
}