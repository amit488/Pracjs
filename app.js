const cityForm=document.querySelector("form");

const updateCity = async (city) =>{

    const cityDetails= await getCity(city);
    const cityWeather=await getWeather(cityDetails.Key);
    return {cityDetails,cityWeather};
};


if (localStorage.getItem("weathercity")) {
    updateCity(localStorage.getItem("weathercity"))
      .then((data) => updateUI(data))
      .catch((err) => console.log(err));
  }


cityForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const city=cityForm.city.value.trim();
    cityForm.reset();

    localStorage.setItem("weathercity",city);
    updateCity(localStorage.getItem("weathercity"))
    .then((data) => updateUI(data))
    .catch((err) => {
      alert("Something went wrong, please try later");
      console.log(err);
      throw new Error("Please enter the correct city name");
});
});


const card=document.querySelector(".card");
const updateUI = (data) => {
    const{cityDetails, cityWeather}=data;
card.innerHTML=`
<img src="img/${
    cityWeather.IsDayTime ? "day.svg" : "night.svg"
  }" class="card-img-top">
  <div class="icon mx-auto bg-light">
      <img src="img/icons/${cityWeather.WeatherIcon}.svg">
  </div>
  <!-- Weather details -->
  <div class="text-muted text-uppercase">
      <h4 class="my-1">${cityDetails.EnglishName}</h4>
      <h5 class="my-1">(${
        cityDetails.AdministrativeArea.EnglishName
      })</h5>
      <h6>${cityDetails.Country.EnglishName}</h6>
      <div class="mt-3">${cityWeather.WeatherText}</div>
      <div class="display-4 my-2">
          <span>${cityWeather.Temperature.Metric.Value}</span>
          <span>&deg;C</span>
      </div>
  </div>
`;
}
