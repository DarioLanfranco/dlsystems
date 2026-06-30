;(function () {
  var toggle = document.querySelector("[data-menu-toggle]")
  var close = document.querySelector("[data-menu-close]")
  var overlay = document.querySelector("[data-menu-overlay]")
  var links = overlay ? overlay.querySelectorAll("a[href]") : []

  function open() {
    if (!overlay) return
    overlay.classList.remove("invisible", "opacity-0")
    overlay.classList.add("visible", "opacity-100")
    document.body.style.overflow = "hidden"
  }

  function closeMenu() {
    if (!overlay) return
    overlay.classList.remove("visible", "opacity-100")
    overlay.classList.add("invisible", "opacity-0")
    document.body.style.overflow = ""
  }

  if (toggle) toggle.addEventListener("click", open)
  if (close) close.addEventListener("click", closeMenu)

  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", closeMenu)
  }
})()
