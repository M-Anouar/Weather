
const apiKey = "9d568cd81af8ea710d36df57e5a48b87";

function getWeather(cityName) {
  const statusMessage = document.getElementById('statusMessage');
  const weatherContent = document.getElementById('weatherContent');

  statusMessage.className = "loading";
  statusMessage.innerHTML = "جاري تحديث البيانات...";
  statusMessage.style.display = "block";
  weatherContent.style.display = "none";

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric&lang=fr`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("لم يتم العثور على المدينة. تأكد من كتابة الاسم  بشكل صحيح.");
        } else {
          throw new Error("حدث خطأ في الاتصال بالسيرفر أو أن المفتاح غير مفعل بعد.");
        }
      }
      return response.json();
    })
    .then(data => {
      statusMessage.style.display = "none";
      weatherContent.style.display = "block";

      const currentData = data.list[0];
      document.getElementById('cityName').textContent = data.city.name;
      document.getElementById('currentTemp').textContent = Math.round(currentData.main.temp);
      document.getElementById('humidity').textContent = `${currentData.main.humidity}% الرطوبة`;

      const mainWeatherId = currentData.weather[0].id;
      const currentHour = new Date().getHours();
      let mainIconEmoji = "☀️";
      if (mainWeatherId >= 801 && mainWeatherId <= 804) {
        mainIconEmoji = (currentHour >= 18 || currentHour <= 5) ? "🌙" : "⛅";
      } else if (mainWeatherId >= 500 && mainWeatherId <= 531) {
        mainIconEmoji = "🌧️";
      }
      document.getElementById('mainIcon').textContent = mainIconEmoji;

      const forecastContainer = document.getElementById('forecastContainer');
      forecastContainer.innerHTML = '';

      for (let i = 0; i < 5; i++) {
        const forecast = data.list[i];
        const date = new Date(forecast.dt * 1000);
        let hourFormatted = date.getHours() + ":00";
        const temp = Math.round(forecast.main.temp);
        const pop = Math.round((forecast.pop || 0) * 100);

        let icon = "☀️";
        const weatherId = forecast.weather[0].id;
        const hourNum = date.getHours();

        if (weatherId >= 801 && weatherId <= 804) {
          icon = (hourNum >= 18 || hourNum <= 5) ? "🌙" : "⛅";
        } else if (weatherId >= 500 && weatherId <= 531) {
          icon = "🌧️";
        }

        const cardHTML = `
                        <div class="hour-column">
                            <div class="hour-time">${hourFormatted}</div>
                            <div class="hour-icon">${icon}</div>
                            <div class="hour-temp">${temp}°</div>
                            <div class="pop">💧 ${pop}%</div>
                        </div>
                    `;
        forecastContainer.innerHTML += cardHTML;
      }
    })
    .catch(error => {
      statusMessage.className = "error-msg";
      statusMessage.innerHTML = error.message;
    });
}

window.addEventListener('DOMContentLoaded', () => {
  getWeather("Al Hoceima");
});

document.getElementById('searchBtn').addEventListener('click', () => {
  const cityValue = document.getElementById('cityInput').value.trim();
  if (cityValue !== "") {
    getWeather(cityValue);
  }
});

document.getElementById('cityInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const cityValue = document.getElementById('cityInput').value.trim();
    if (cityValue !== "") {
      getWeather(cityValue);
    }
  }
});