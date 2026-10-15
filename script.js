// المفتاح يُقرأ من config.js (غير مرفوع إلى GitHub). انظر README.md
const apiKey = window.WEATHER_API_KEY;

const DEFAULT_CITY = "Al Hoceima";
const FORECAST_ITEMS = 5;

const statusMessage = document.getElementById("statusMessage");
const weatherContent = document.getElementById("weatherContent");
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

function showStatus(message, className) {
  statusMessage.className = className;
  statusMessage.textContent = message;
  statusMessage.style.display = "block";
  weatherContent.style.display = "none";
}

// يحوّل رمز حالة الطقس إلى إيموجي
function getIcon(weatherId, isNight) {
  if (weatherId >= 200 && weatherId < 300) return "⛈️";
  if (weatherId >= 300 && weatherId < 400) return "🌦️";
  if (weatherId >= 500 && weatherId < 600) return "🌧️";
  if (weatherId >= 600 && weatherId < 700) return "❄️";
  if (weatherId >= 700 && weatherId < 800) return "🌫️";
  if (weatherId === 800) return isNight ? "🌙" : "☀️";
  if (weatherId === 801 || weatherId === 802) return isNight ? "☁️" : "⛅";
  if (weatherId >= 803) return "☁️";
  return "☀️";
}

// الساعة المحلية للمدينة (وليس ساعة جهاز المستخدم)
function getCityHour(timestamp, timezoneOffset) {
  return new Date((timestamp + timezoneOffset) * 1000).getUTCHours();
}

function isNightHour(hour) {
  return hour >= 18 || hour <= 5;
}

async function getWeather(cityName) {
  if (!apiKey) {
    showStatus("مفتاح API غير موجود. أنشئ ملف config.js (انظر README).", "error-msg");
    return;
  }

  showStatus("جاري تحديث البيانات...", "loading");

  const url =
    "https://api.openweathermap.org/data/2.5/forecast" +
    `?q=${encodeURIComponent(cityName)}` +
    `&appid=${apiKey}&units=metric&lang=ar`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        showStatus("لم يتم العثور على المدينة. تأكد من كتابة الاسم بشكل صحيح.", "error-msg");
      } else {
        showStatus("حدث خطأ في الاتصال بالسيرفر أو أن المفتاح غير مفعل بعد.", "error-msg");
      }
      return;
    }

    const data = await response.json();
    renderWeather(data);
  } catch (error) {
    showStatus("تعذّر الاتصال بالإنترنت. حاول مرة أخرى.", "error-msg");
  }
}

function renderWeather(data) {
  const tz = data.city.timezone;
  const current = data.list[0];

  statusMessage.style.display = "none";
  weatherContent.style.display = "block";

  document.getElementById("cityName").textContent = data.city.name;
  document.getElementById("currentTemp").textContent = Math.round(current.main.temp);
  document.getElementById("humidity").textContent = `${current.main.humidity}% الرطوبة`;

  const currentHour = getCityHour(current.dt, tz);
  document.getElementById("mainIcon").textContent = getIcon(
    current.weather[0].id,
    isNightHour(currentHour)
  );

  const forecastContainer = document.getElementById("forecastContainer");
  forecastContainer.innerHTML = "";

  data.list.slice(0, FORECAST_ITEMS).forEach((item) => {
    const hour = getCityHour(item.dt, tz);
    const temp = Math.round(item.main.temp);
    const pop = Math.round((item.pop || 0) * 100);
    const icon = getIcon(item.weather[0].id, isNightHour(hour));

    forecastContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="hour-column">
         <div class="hour-time">${hour}:00</div>
         <div class="hour-icon">${icon}</div>
         <div class="hour-temp">${temp}°</div>
         <div class="pop">💧 ${pop}%</div>
       </div>`
    );
  });
}

function searchCity() {
  const city = cityInput.value.trim();
  if (city !== "") getWeather(city);
}

window.addEventListener("DOMContentLoaded", () => getWeather(DEFAULT_CITY));
searchBtn.addEventListener("click", searchCity);
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchCity();
});
