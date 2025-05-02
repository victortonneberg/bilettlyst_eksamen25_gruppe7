import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryCardAttraction from "./CategoryCardAttraction";

export default function CategoryPage() {
    const { slug } = useParams();
    const [attractions, setAttractions] = useState([]);
    const [city, setCity] = useState("oslo"); 
    const [segment] = useState(slug); 

    
const segmentMap = {
    musikk: "Music",
    sport: "Sports",
    teater: "Theatre"
}
   
const getAttraction = () => {
    const apiUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&city=${city}&classificationName=${segmentMap[slug] || slug}`;
        fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
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
                            name: event.name,
                            date: event.dates?.start?.localDate,
                            venue: event._embedded?.venues?.[0]?.name
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