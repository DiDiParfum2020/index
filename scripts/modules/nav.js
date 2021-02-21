const header = document.getElementById("header");
const nav = document.getElementById("nav");
const links = nav.querySelectorAll(".nav__links")
const navOpenBtn = document.getElementById("navOpen");
const navCloseBtn = document.getElementById("navClose");
const bgNavOpen = document.createElement("div")

bgNavOpen.classList.add("bgNav")
header.appendChild(bgNavOpen)

function navBtnsBehavior() {
  nav.classList.toggle("showNav");
  bgNavOpen.classList.toggle("bgNavOpen")
  navOpenBtn.classList.toggle("hide")
  navCloseBtn.classList.toggle("hide")
}

// links.forEach(el => el.addEventListener("click", navBtnsBehavior))
navOpenBtn.addEventListener("click", navBtnsBehavior);
navCloseBtn.addEventListener("click", navBtnsBehavior);
bgNavOpen.addEventListener("click", navBtnsBehavior);


function navView() {
  const windowWidth = window.innerWidth
  if(windowWidth >= 600) {
    links.forEach(el => el.removeEventListener("click", navBtnsBehavior))
    nav.classList = ""
    nav.classList.add("navNoMobile")
  } else if ( windowWidth < 600) {
    links.forEach(el => el.addEventListener("click", navBtnsBehavior))
    nav.classList = "header__nav"
    bgNavOpen.classList.remove("bgNavOpen")
  }
}

navView()

window.addEventListener("resize", navView)