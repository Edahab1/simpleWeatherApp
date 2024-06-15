const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

async function checkWeather(city) {
  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=4402261227df49b1835125248241106&q=${city}&days=3`
    );
    const data = await res.json();

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const date = new Date(data.location.localtime);
    let weekday = days[date.getDay()];
    let monthName = month[date.getMonth()];
    let day = date.getDate();

    document.getElementById("location").textContent = data.location.name;
    document.getElementById("todayDay").textContent = weekday;
    document.getElementById("todayDate").textContent = day + " " + monthName;
    document.getElementById("todayDeg").innerHTML = data.current.temp_c + " °C";
    let icon = document.getElementById("todayIcon");
    let iconImg = data.current.condition.icon;
    icon.setAttribute("src", `https://${iconImg}`);
    document.getElementById("todayCondition").textContent =
      data.current.condition.text;
    document.getElementById("todayRain").textContent =
      data.forecast.forecastday[0].day.daily_chance_of_rain + "%";
    document.getElementById("todayWind").textContent = data.current.wind_kph;
    document.getElementById("todayPressue").textContent =
      data.current.pressure_mb + " mb";

    //   second day forecast
    const date2 = new Date(data.forecast.forecastday[1].date);
    let weekday2 = days[date2.getDay()];
    document.getElementById("day2Day").textContent = weekday2;
    let icon2 = document.getElementById("day2Icon");
    let icon2Img = data.forecast.forecastday[1].day.condition.icon;
    icon2.setAttribute("src", `https://${icon2Img}`);
    document.getElementById("day2DegH").textContent =
      data.forecast.forecastday[1].day.maxtemp_c;
    document.getElementById("day2DegL").textContent =
      data.forecast.forecastday[1].day.mintemp_c;
    document.getElementById("day2Condition").textContent =
      data.forecast.forecastday[1].day.condition.text;

    //   third day forecast
    const date3 = new Date(data.forecast.forecastday[2].date);
    let weekday3 = days[date3.getDay()];
    document.getElementById("day3Day").textContent = weekday3;
    let icon3 = document.getElementById("day3Icon");
    let icon3Img = data.forecast.forecastday[2].day.condition.icon;
    icon3.setAttribute("src", `https://${icon3Img}`);
    document.getElementById("day3DegH").textContent =
      data.forecast.forecastday[2].day.maxtemp_c;
    document.getElementById("day3DegL").textContent =
      data.forecast.forecastday[2].day.mintemp_c;
    document.getElementById("day3Condition").textContent =
      data.forecast.forecastday[2].day.condition.text;
  } catch (error) {
    console.error("error");
  }
}

checkWeather("Cairo")


searchBtn.addEventListener("click", function () {
  const city = searchInput.value;
  checkWeather(city);
});

function pressEnter (e, button){
  if (e.key == "Enter"){
    button.click()
  }
}

document.addEventListener("keypress", function(e){
  pressEnter(e, searchBtn)
})