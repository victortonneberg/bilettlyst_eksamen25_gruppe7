import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryCardAttraction from "./CategoryCardAttraction";

export default function CategoryPage() {
    const { slug } = useParams();
    const [attractions, setAttractions] = useState([]);
    const [city, setCity] = useState(""); 
    const [segment, setSegment] = useState(slug); 

   
        const getAttraction = () => {
        const apiUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&locale=*&city=${city}&segmentName=${segment}`;
        fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log("API Response:", data); // Logg hele API-responsen

            if (data?._embedded?.events) {
                setAttractions(data._embedded.events);
            } else {
                setAttractions([]);
            }
        }) 
        .catch((error) => {
            console.log("Skjedde feil under lasting: ", error);
            setAttractions([]);
        });
};

useEffect(() => {
    getAttraction();
}, [slug, city]); 

const handleCityChange = (e) => {
    setCity(e.target.value);
};



            return (
            <>
                <h2>Filtrert søk</h2>
                <section id="categoryPage-filter">
                    <p>Dato:</p>
                    <input type="date" />
                    <p>Land:</p>
                    <select name="Land" id="country">
                        <option value="Norge">Norge</option>
                        <option value="Sverige">Sverige</option>
                        <option value="Danmark">Danmark</option>
                    </select>
                    <p>By:</p>
                    <select name="By" id="city" onChange={handleCityChange} value={city}>
                        <option value="Oslo">Oslo</option>
                        <option value="Stockholm">Stockholm</option>
                        <option value="København">København</option>
                    </select>
                </section>
                <h2>Søk</h2>
                <section>
                    <p>Søk etter event, attraksjon eller spillested</p>
                    <input type="text" />
                </section>
                <section>
                {attractions.length > 0 ? (
                    attractions.map((event) => (
                        <CategoryCardAttraction 
                        key={event.id}
                        segment={{
                            image: event.images?.[0]?.url || "https://via.placeholder.com/150", // Håndter manglende bilde
                            name: event.name || "Ukjent navn", // Håndter manglende navn
                        }}
                        />
                    ))
                ) : (
                    <p>Ingen arrangementer funnet</p>
                )}

                </section>
            </>
        );
    }