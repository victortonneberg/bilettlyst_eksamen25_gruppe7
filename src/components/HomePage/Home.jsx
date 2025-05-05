import { useEffect, useState } from "react"

function FestivalData() {
  const [festivals, setFestivals] = useState([])

  const festivalNames = [
    "Findings",
    "Neon",
    "Skeikampenfestivalen",
    "Tons of Rock"
  ]

  useEffect(() => {
    const fetchedFestivals = []
    let completedRequests = 0

    festivalNames.forEach((festivalName) => {
      fetch(`/api/discovery/v2/events?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&keyword=${festivalName}&locale=*&size=1&countryCode=NO`)
        .then(response => response.json())
        .then(data => {
          if (data._embedded?.events?.length) {
            fetchedFestivals.push(data._embedded.events[0])
          }

          completedRequests++
          const allRequestsDone = completedRequests === festivalNames.length

          if (allRequestsDone) {
            setFestivals(fetchedFestivals)
          }
        })
    })
  }, [])

  return (
    <main>
      <h1>Festivaler</h1>
      <ul>
        {festivals.map((festival) => (
          <li key={festival.id}>
            <article>
              <h2>{festival.name}</h2>
              <img
                src={festival.images[0].url}
                alt={`Bilde fra ${festival.name}`}
                style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
              />
            </article>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default FestivalData

/* Kilder:
   https://www.geeksforgeeks.org/fetching-data-from-an-api-with-useeffect-and-usestate-hook/
   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining#optional_element_access 
   søskenbarn Neema Cihiluka 
*/