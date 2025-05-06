import { useEffect, useState } from "react"
import FestivalCard from "./FestivalCard"
import "../../assets/styles/HomePage/Home.scss";


export default function FeaturedFestivals() {
  const festivalIds = [
    "Z698xZb_Z16vf7eZZV",
    "Z698xZb_Z17q3f6",
    "Z698xZb_Z17q3rd",
    "Z698xZb_Z17qfao"
  ]

  const [festivals, setFestivals] = useState([])

  const getTicketmasterData = () => {

    const promises = festivalIds.map((id) =>
      fetch(
        `https://app.ticketmaster.com/discovery/v2/events/${id}?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&locale=*`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("TM response for", id, data)
          return data
        })
        .catch((error) => {
          console.log("Feil under fetch fra TM for", id, ":", error)
          return null
        })
    )

    
    Promise.all(promises).then((results) => {

      const successful = results.filter((event) => event !== null)
      setFestivals(successful)
      //https://www.geeksforgeeks.org/how-to-fetch-an-array-of-urls-with-promise-all/
      //Sjekket kursets repository, men finner ingen annen måte å gjøre det på. 

    })
  }

  useEffect(() => {
    getTicketmasterData()
  }, [])

  return (
    <>
      <h2>Utvalgte festivaler</h2>
      <section className="festivals-grid">
        {festivals.length > 0 ? (
          festivals.map((event) => (
            <FestivalCard key={event.id} event={event} />
          ))
        ) : (
          <p>Laster inn festivalene…</p>
        )}
      </section>
    </>
  )
}
