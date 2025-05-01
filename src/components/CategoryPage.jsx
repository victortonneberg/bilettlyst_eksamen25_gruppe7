import CategoryCardAttraction from "./CategoryCardAttraction";

    export default function CategoryPage() {
        
        
        fetch('https://app.ticketmaster.com/discovery/v2/events?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&locale=*&city=oslo')
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Skjedde en feil under lasting:', error))

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