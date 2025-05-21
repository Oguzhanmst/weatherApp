//HTML seçimi
const backIndex = document.querySelector(".back-index");
const favBtn = document.querySelector(".favorites-btn");

function contentElement(
  code,
  name,
  tempature,
  min,
  dec,
  max,
  wind,
  hum,
  sunset,
  sunrise,
  main
) {
  const countrCode = document.querySelector(".country-code");
  countrCode.textContent = code;
  const cityName = document.querySelector(".city-name");
  cityName.textContent = name;

  //Hava durumunda göre görsel değiştirme
  const weatherImg = document.querySelector(".weather-image");
  const weatherImgAttribute = weatherImg.getAttribute("src");

  if (main === "Clouds") {
    weatherImg.setAttribute("src", "images/clouds.png");
  } else if (main === "Clear") {
    weatherImg.setAttribute("src", "images/clear-sun.png");
  } else if (main === "Rain") {
    weatherImg.setAttribute("src", "images/rain.png");
  } else if (main === "Drizzle") {
    weatherImg.setAttribute("src", "images/drizzle.png");
  } else if (main === "Thunderstrom") {
    weatherImg.setAttribute("src", "images/thunderstorm.png");
  } else if (main === "Snow") {
    weatherImg.setAttribute("src", "images/snow.png");
  } else if (main === "Fog") {
    weatherImg.setAttribute("src", "images/fog.png");
  }

  const cityTempature = document.querySelector(".city-tempature");
  cityTempature.textContent = tempature;
  const cityMinTempature = document.querySelector(".city-min-tempature");
  cityMinTempature.textContent = `${min}°C`;
  const weatherDec = document.querySelector(".weather-dec");
  weatherDec.textContent = dec;
  const cityMaxTempature = document.querySelector(".city-max-tempature");
  cityMaxTempature.textContent = `${max}°C`;
  const windSpeedText = document.querySelector(".wind-speed-text");
  windSpeedText.textContent = `${wind} km/h`;
  const humPercentageText = document.querySelector(".hum-percentage-text");
  humPercentageText.textContent = `${hum}%`;

  const sunriseText = document.querySelector(".sunrise-text");
  const sunriseTime = new Date(sunrise * 1000);
  const setHours = sunriseTime.getHours().toString().padStart(2, "0");
  const setMinutes = sunriseTime.getMinutes().toString().padStart(2, "0");
  sunriseText.textContent = `${setHours}:${setMinutes}`;

  const sunsetText = document.querySelector(".sunset-text");
  const sunsetTime = new Date(sunset * 1000);
  const riseHours = sunsetTime.getHours().toString().padStart(2, "0");
  const riseMinutes = sunsetTime.getMinutes().toString().padStart(2, "0");
  sunsetText.textContent = `${riseHours}:${riseMinutes}`;

  //Favori eklemek

  favBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (name) {
      let favCity = JSON.parse(localStorage.getItem("favorites")) || [];

      if (!favCity.includes(name)) {
        favCity.push(name);
        localStorage.setItem("favorites", JSON.stringify(favCity));
      }
    }

    window.location.href = "index.html";
  });
}

//index.html geri dönüş için basit bir litener
backIndex.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "index.html";
});

//Index.html'den aldığımız input verisini OpenWeather vererk apiden veri çekmek
const APIkey = "b11fea6d72f626ff7bcd515a70c3d48a";

//index.html gelen veriyi yakalama işlemi
const params = new URLSearchParams(window.location.search);
const city = params.get("city");

if (city) {
  const APIurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`;

  fetch(APIurl)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Şehir bulunamadı");
      }

      return res.json();
    })
    .then((data) => {
      contentElement(
        data.sys.country,
        data.name,
        data.main.temp,
        data.main.temp_min,
        data.weather[0].description,
        data.main.temp_max,
        data.wind.speed,
        data.main.humidity,
        data.sys.sunset,
        data.sys.sunrise,
        data.weather[0].main
      );

      console.log(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
} else {
  console.log("indexten gelen şehir ismi bulunmamaktadır.");
}
