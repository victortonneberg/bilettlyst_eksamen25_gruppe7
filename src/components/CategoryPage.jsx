import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryCardAttraction from "./CategoryCardAttraction";
import { useState as setError } from "react";

export default function CategoryPage() {
        const { slug } = useParams()
        const [attractions, setAttractions] = useState([]);

   
        const getAttraction = () => {
            // https://app.ticketmaster.com/discovery/v2/events?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&attractionId=2&locale=*
            // fetch('https://app.ticketmaster.com/discovery/v2/attractions?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&locale=*')
            //     .then(response => response.json())
            //     .then(data => console.log(data))
            //     .catch(error => console.error('Skjedde en feil under lasting:', error));

        const apiUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&locale=*&city=${city}&segmentName=${segment}`;
        fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => setAttractions( [])) 
        .catch((error) => 
            console.log("Feil Under Fetching data: ", error)
        );

        };
    useEffect(() => {
        getAttraction();
    }, [slug]);
            return(
            <>
                <h2>Filtrert søk</h2>
                <section id="categoryPage-filter">
                    <p>Dato:</p>
                    <input type="date"></input>
                    <p>Land:</p>
                    <select name="Land" id="country">
                        <option value="Norge">Norge</option>
                        <option value="Sverige">Sverige</option>
                        <option value="Danmark">Danmark</option>
                    </select>
                    <p>By:</p>
                    <select name="By" id="city">
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
                    <CategoryCardAttraction category="" />
                    <CategoryCardAttraction category="" />
                    <CategoryCardAttraction category="" />
                </section>
            </>
        )
    }