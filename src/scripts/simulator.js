;(function () {
  var FORMAT = new Intl.NumberFormat("es-AR")
  var HOUR_COST = 1500
  var ERROR_COST = 3500
  var TIME_PER_ORDER = 0.25

  var CONFIGS = {
    gastronomia: {
      label1: "Pedidos por mes",
      label2: "Horas respondiendo WhatsApp / semana",
      default1: 300, max1: 1000,
      default2: 10, max2: 40,
    },
    comercio: {
      label1: "Productos en inventario",
      label2: "Horas haciendo stock manual / semana",
      default1: 150, max1: 800,
      default2: 15, max2: 40,
    },
    servicios: {
      label1: "Turnos mensuales",
      label2: "Horas coordinando agenda / semana",
      default1: 120, max1: 500,
      default2: 8, max2: 30,
    },
  }

  var rubros = document.querySelectorAll("[data-rubro]")
  var slider1 = document.querySelector("[data-slider1]")
  var slider2 = document.querySelector("[data-slider2]")
  var slider3 = document.querySelector("[data-slider3]")
  var val1 = document.querySelector("[data-slider1-value]")
  var val2 = document.querySelector("[data-slider2-value]")
  var val3 = document.querySelector("[data-slider3-value]")
  var label1 = document.querySelector("[data-slider1-label]")
  var label2 = document.querySelector("[data-slider2-label]")
  var savings = document.querySelector("[data-savings]")
  var btnExplicar = document.querySelector("[data-explicar]")
  var breakdown = document.querySelector("[data-breakdown]")
  var breakdownText = document.querySelector("[data-breakdown-text]")
  var activeRubro = "gastronomia"

  function setActive(rubro) {
    activeRubro = rubro
    for (var i = 0; i < rubros.length; i++) {
      var btn = rubros[i]
      btn.dataset.active = btn.dataset.rubro === rubro ? "true" : undefined
    }
  }

  function applyConfig(rubro) {
    var cfg = CONFIGS[rubro]
    if (!cfg) return
    label1.textContent = cfg.label1
    label2.textContent = cfg.label2
    slider1.max = cfg.max1
    slider2.max = cfg.max2
    slider1.value = cfg.default1
    slider2.value = cfg.default2
    val1.textContent = cfg.default1
    val2.textContent = cfg.default2 + " h"
  }

  function calculate() {
    var v1 = parseFloat(slider1.value) || 0
    var v2 = parseFloat(slider2.value) || 0
    var v3 = parseFloat(slider3.value) || 0

    var hoursRecovered = v1 * TIME_PER_ORDER + v2 * 4
    var adminSavings = hoursRecovered * HOUR_COST
    var errorSavings = v3 * ERROR_COST
    var total = adminSavings + errorSavings

    savings.textContent = "$ " + FORMAT.format(Math.round(total))

    if (breakdownText) {
      var h = Math.round(hoursRecovered * 10) / 10
      breakdownText.innerHTML =
        "• Recuperás <strong>" + FORMAT.format(h) + " h</strong> al mes automatizando la carga de datos y confirmaciones de WhatsApp.<br>" +
        "• Evitás <strong>" + v3 + " errores</strong> manuales de inventario o despachos cruzados.<br>" +
        "• Al dejar de perder ese tiempo y mercadería, tu negocio retiene <strong>$ " + FORMAT.format(Math.round(total)) + "</strong> en mano."
    }
  }

  function onSliderInput() {
    val1.textContent = slider1.value
    val2.textContent = slider2.value + " h"
    val3.textContent = slider3.value
    calculate()
  }

  function onRubroClick(e) {
    var btn = e.currentTarget
    if (btn.dataset.rubro === activeRubro) return
    setActive(btn.dataset.rubro)
    applyConfig(btn.dataset.rubro)
    calculate()
  }

  function onToggleExplicar() {
    breakdown.classList.toggle("hidden")
  }

  // init
  setActive("gastronomia")
  applyConfig("gastronomia")
  calculate()

  for (var i = 0; i < rubros.length; i++) {
    rubros[i].addEventListener("click", onRubroClick)
  }
  slider1.addEventListener("input", onSliderInput)
  slider2.addEventListener("input", onSliderInput)
  slider3.addEventListener("input", onSliderInput)
  if (btnExplicar) btnExplicar.addEventListener("click", onToggleExplicar)
})()
