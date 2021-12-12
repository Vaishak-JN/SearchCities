const form = document.querySelector('#form');
const search = document.querySelector('#search');
const box = document.querySelector('#box');

let cities = []

const loadData = async () => {
    try {
        const res = await fetch("https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json")
        const data = await res.json()

        console.log(data)

        cities = data;
        display(cities);

    } catch (error) {
        console.log(error)
    }
}

const display = (cities) => {
    let display = ""

    if (cities.length > 0) {

        cities.forEach((city) => {
            display = display + `<div class="card my-3 mx-auto col-lg-5 text-muted">
        <h5 class="card-header bg-dark text-light">${city.city}</h5>
        <div class="p-3"><h6>Growth : ${city.growth_from_2000_to_2013}</h6>
        <h6>Latitude : ${city.latitude}</h6>
        <h6>Longitude : ${city.longitude}</h6>
        <h6>Population : ${city.population}</h6>
        <h6>State : ${city.state}</h6></div>
    </div>`
        });

    } else {
        display = `<div class=" m-4">
            <h5 class="text-danger">No Citites / States Found.</h5>
        </div>`

    }

    box.innerHTML = display

}

document.onload = loadData();

search.addEventListener("keyup", (event) => {
    event.preventDefault();
    const val = event.target.value
    const regexp = /^[a-z]{1,}$/ig;
    if (regexp.test(val)) {
        document.querySelector("#error").className = "valid"
        searchCities(val)
        search.className("valid")
    } else {
        document.querySelector("#error").className = "invalid"
        search.className("invalid")
    }
    console.log(val)

})

const searchCities = (val) => {
    const filteredCities = cities.filter((city) => {
        // const regex = /`${val}`/ig;
        const regex = new RegExp(`${val}`, "gi")
        return city.city.match(regex) || city.state.match(regex)
    })

    display(filteredCities)
};