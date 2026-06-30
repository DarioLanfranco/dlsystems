;(function () {
  function pad(n) {
    return n.toString().padStart(2, "0")
  }

  function updateClock() {
    try {
      const now = new Date()
      let hours = now.getHours()
      const ampm = hours >= 12 ? "PM" : "AM"
      hours = hours % 12 || 12
      const timeStr = `${hours}:${pad(now.getMinutes())}:${pad(now.getSeconds())} ${ampm}`

      const timeEl = document.querySelector("[data-clock-time]")
      if (timeEl) timeEl.textContent = timeStr

      const dateEl = document.querySelector("[data-clock-date]")
      if (dateEl) {
        const formatted = now.toLocaleDateString("es-AR", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })
        dateEl.textContent = formatted.charAt(0).toUpperCase() + formatted.slice(1)
      }
    } catch {
      // silent — keep static fallback
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      updateClock()
      setInterval(updateClock, 1000)
    })
  } else {
    updateClock()
    setInterval(updateClock, 1000)
  }
})()
