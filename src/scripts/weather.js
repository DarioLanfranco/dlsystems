;(function () {
  const ENDPOINT =
    "https://api.open-meteo.com/v1/forecast?latitude=-33.1307&longitude=-64.3499&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=America/Argentina/Buenos_Aires&forecast_days=4"

  const WMO_ICONS = {
    0: "☀️",
    1: "⛅", 2: "⛅", 3: "⛅",
    45: "🌫️", 48: "🌫️",
    51: "🌦️", 53: "🌦️", 55: "🌦️",
    56: "🌧️", 57: "🌧️",
    61: "🌧️", 63: "🌧️", 65: "🌧️",
    66: "🌧️", 67: "🌧️",
    71: "❄️", 73: "❄️", 75: "❄️", 77: "❄️",
    80: "🌦️", 81: "🌦️", 82: "🌦️",
    85: "❄️", 86: "❄️",
    95: "⛈️",
    96: "⛈️", 99: "⛈️",
  }

  function getIcon(code) {
    return WMO_ICONS[code] || "☀️"
  }

  function getDayName(dateStr) {
    const date = new Date(dateStr + "T12:00:00")
    return date.toLocaleDateString("es-AR", { weekday: "short" }).replace(".", "")
  }

  async function fetchWeather() {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(function () { controller.abort() }, 5000)
      const res = await fetch(ENDPOINT, { signal: controller.signal })
      clearTimeout(timeout)
      if (!res.ok) return
      const data = await res.json()

      const current = data.current
      const daily = data.daily

      const tempEl = document.querySelector("[data-weather-temp]")
      const iconEl = document.querySelector("[data-weather-icon]")
      if (tempEl && current) {
        tempEl.textContent = Math.round(current.temperature_2m) + "°C"
      }
      if (iconEl && current) {
        iconEl.textContent = getIcon(current.weather_code)
      }

      if (daily) {
        for (let i = 1; i <= 3; i++) {
          const iconDayEl = document.querySelector(`[data-day-icon-${i}]`)
          const tempDayEl = document.querySelector(`[data-day-temp-${i}]`)
          const dayNameEl = document.querySelector(`[data-day-name-${i}]`)
          if (!iconDayEl || !tempDayEl || !dayNameEl) continue
          dayNameEl.textContent = getDayName(daily.time[i])
          iconDayEl.textContent = getIcon(daily.weather_code[i])
          const max = Math.round(daily.temperature_2m_max[i])
          const min = Math.round(daily.temperature_2m_min[i])
          tempDayEl.textContent = `${min}°/${max}°`
        }
      }
    } catch {
      // fallback — keep hardcoded values
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fetchWeather)
  } else {
    fetchWeather()
  }
})()
