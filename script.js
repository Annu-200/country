const countryContainer = document.querySelector(".country-container");
const filterReligon = document.querySelector("#filter-by-relgion");
const searchCountry = document.querySelector(".search-filter-container");
const theme = document.querySelector(".theme-change");
let data 

fetch("https://restcountries.com/v3.1/all")
  .then((resp) => resp.json())
  .then(renderData)
  .catch((error) => {
    console.log(error);
  });

filterReligon.addEventListener("change", (e) => {
  fetch(`https://restcountries.com/v3.1/region/${filterReligon.value}`)
    .then((resp) => resp.json())
    .then((data) => {
      renderData(data);
    });
});
// console.log(countryContainer)

fetch("https://restcountries.com/v3.1/all")
.then((resp) => resp.json())
.then((data) => {
    renderData(data);
    allcountryData = data
})
let allcountryData;

function renderData(data) {

  countryContainer.innerHTML = "";
  data.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.href = `/country.html?name=${country.name.common}`;
    countryCard.classList.add("country-card");

    countryCard.innerHTML = `
                    <img src="${country.flags.svg}" alt="flag">
                            <div class="card-details">
                            <div class="card-title">
                                <h3>${country.name.common}</h3>
                    </div>
                                <p><b>Population</b> ${country.population.toLocaleString(
                                  "en-IN"
                                )}</p>
                                <p><b>Region</b>: ${country.region}</p>
                                <p><b>Capition</b>: ${country.capital}</p>
                    </div>`;

    countryContainer.append(countryCard);
  });
}

searchCountry.addEventListener("input" , (e) => {
   const filterCountries = allcountryData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
   renderData(filterCountries)
});
theme.addEventListener('click' , () => {
  document.body.classList.toggle("dark")
} )

function toggleTheme() {
  document.body.classList.toggle('dark');
  // Save the current theme in localStorage
  if (document.body.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
  } else {
      localStorage.setItem('theme', 'light');
  }
}

theme.addEventListener('click' , () => {
  toggleTheme();
} )

window.onload = function() {
   const saveTheme = localStorage.getItem('theme');
   if(saveTheme  === "dark") {
    document.body.classList.add('dark');
   }
}