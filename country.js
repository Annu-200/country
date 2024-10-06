const countryname = new URLSearchParams(location.search).get('name')
const countryFlag = document.querySelector(".country-details img")
const countryH2 = document.querySelector(".detail-text-container h2")
const aboutCountry = document.querySelector(".details-text")
const nativeName = document.querySelector(".native-name")
const population = document.querySelector(".population")
const Region = document.querySelector(".religon")
const subRegion = document.querySelector(".sub-relgion")
const capital = document.querySelector(".capital")
const domain = document.querySelector(".domein")
const currencie = document.querySelector(".currencie")
const lang = document.querySelector(".lang")
const borderCountries = document.querySelector(".border-country")
const backBtn = document.querySelector(".back-btn")
const theme = document.querySelector(".theme-change");

fetch(`https://restcountries.com/v3.1/name/${countryname}?fullText=true`)
.then((resp)=> resp.json())
.then(([country])=>{
    console.log(country)
  countryFlag.src = country.flags.svg
  countryH2.innerHTML = country.name.common
  population.innerText = country.population.toLocaleString('en-IN')
  Region.innerText = country.region
  domain.innerText = country.tld

  if(country.subregion){
     subRegion.innerText = country.subregion
  }
  if(country.currencies){
    currencie.innerHTML = Object.values(country.currencies).map((currency) => currency.name).join(',')
  }
  if(country.languages){
     lang.innerText = Object.values(country.languages)
  }
  if(country.capital){
    capital.innerText = country.capital
  }
  if(country.name.nativeName){
    nativeName.innerText = Object.values(country.name.nativeName)[0].common
  }else{
    nativeName.innerText =  country.name.common
  }
  if(country.borders){
    country.borders.forEach((border) => {
      fetch(`https://restcountries.com/v3.1/alpha/${border}`)
      .then((resp) => resp.json())
      .then(([borderCountry])=> {
        const borderCountryTag = document.createElement("a")
        borderCountryTag.innerText = borderCountry.name.common
        borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
        borderCountries.append(borderCountryTag)
      })
    });
  }
})
backBtn.addEventListener('click', (e) => {
  history.back()
})

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