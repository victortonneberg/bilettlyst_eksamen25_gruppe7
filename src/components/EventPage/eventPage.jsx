import React, { useEffect, useState } from "react"

export default function EventPage() {
  const [results, setResults] = useState([])
  const getData = async () => {
    fetch(
      "https://app.ticketmaster.com/discovery/v2/events?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&locale=*"
    )
      .then((response) => response.json())
      .then((data) => setResults()) // Må finne riktig data her.... Inni setResults(....her....)
      .catch((error) => console.log("Feil Under Fetching data: ", error))
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <h2>Findings Festival</h2>
      <nav>
        <ul>
          <p>Sjanger:</p>
          <li>
            <a href="/sjanger/1">Music</a>
          </li>
          <li>
            <a href="/sjanger/2">Undefined</a>
          </li>
          <li>
            <a href="/sjanger/3">Festival</a>
          </li>
          <li>
            <a href="/sjanger/4">Undefined</a>
          </li>
        </ul>
      </nav>
      <p>Følg oss på sosiale medier:</p>
      <section></section>
    </>
  )
}
