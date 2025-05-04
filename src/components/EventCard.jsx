export default function EventCard({ id, image, name, dates, location }) {
    return(
        <>
            <article key={id} >
                <img src={image} alt={name} />
                <h4>{name}</h4>
                <p>{dates}</p>
                <p>{location}</p>
                <button>kjøp</button>
                <button>Legg til i ønskeliste</button>
            </article>
        </>
    )
}