const cards = document.querySelectorAll(".article")
// console.log( "Total article cards:" ,cards.length);

cards.forEach(el => {
  el.addEventListener("click", () => {
    const clon = el.cloneNode(true)
    // clon.classList = ""
    clon.classList.add("cardZoom")

    function removeClon () {
      clonContainer.remove()
      clon.remove()
    }
    
    const closeClon = document.createElement("div")
    closeClon.innerHTML = "x"
    closeClon.classList.add("closeClon")
    closeClon.addEventListener("click", removeClon)
    
    const clonContainer = document.createElement("div")
    clonContainer.classList.add("containerCardZoom")
    clonContainer.addEventListener("click", removeClon)
    
    clon.appendChild(closeClon)

    document.body.appendChild(clonContainer)
    document.body.appendChild(clon)
    console.log(clon);
  })
})