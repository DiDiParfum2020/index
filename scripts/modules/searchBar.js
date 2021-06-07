// SELECTION of DOM ELEMENTS

const itemsAvailableToSearch = document.querySelectorAll(".article")
const itemsResume = []
const searchBarResults = document.getElementById("searchBarResults")
const barInput = document.getElementById("searchInput")

// SELECTION of ITEMS AVAILABLES TO SEARCH
itemsAvailableToSearch.forEach( el => {
  // el.addEventListener("target", () => console.log(el))
  
  const obj = {}

  const tittle = el.querySelector("h2").textContent.toLowerCase()
  obj.tittle = tittle;
  el.id = tittle
  
  const img = el.querySelector(".article__img")
  obj.imgProduct = img.cloneNode(true)
  // ---------------------------------------------------------

  obj.top = el.offsetTop;
  obj.element = el
  
  // ---------------------------------------------------------
  itemsResume.push(obj)
})

// FUNCTIONS remade CLASSES
function toggleResultsView() {
  barInput.value = ""
  searchBarResults.innerHTML = "";
  searchBarResults.classList.toggle("showBarInput")
}


// DATA
let barInputValue = "";

let elementSelectedBySearchBar = "";

function barInputBehavior ({target}) {
  barInputValue = target.value.toLowerCase()
  searchBarResults.innerHTML = "";
  
  for(let i = 0; i < itemsResume.length; i++) {
    if( itemsResume[i].tittle.indexOf(barInputValue) !== -1 && barInput.value !== "") {
      const wrapper = document.createElement("div")
      wrapper.classList.add("wrapperItem")
      itemsResume[i].imgProduct.classList.remove("article__img")
      itemsResume[i].imgProduct.classList.add("itemWrapped")
      wrapper.appendChild(itemsResume[i].imgProduct)
      
      const wrapperTittle = document.createElement("p") 
      wrapper.href = "#" + itemsResume[i].tittle
      wrapperTittle.innerHTML = itemsResume[i].tittle
      wrapper.appendChild(wrapperTittle)

      // ---------------------------------------------------------

      wrapper.addEventListener("click", () =>{
        console.log("Article ScrollTop:", itemsResume[i].top);
        itemsResume[i].element.style.border = "2px solid #f00"
        setTimeout(() => {
          elementSelectedBySearchBar = itemsResume[i].element;
        }, 500);
        const scrollToArticle = itemsResume[i].top - 50;
        console.log("Y to ScrollY:", scrollToArticle);
        window.scrollTo(0, scrollToArticle);
        console.log("Window scrollY after scroll to Article:", window.scrollY);
        console.log(
          "%c----------------------------", "color: lime;"
        )
      });
      
      // ---------------------------------------------------------
      searchBarResults.appendChild(wrapper)
    } 
  }
  if(searchBarResults.innerHTML === "") {
    const warningNoResults = document.createElement("p")
    warningNoResults.classList.add("resulstWarning")
    warningNoResults.innerHTML = "Sin resultados..."
    
    searchBarResults.innerHTML =""
    searchBarResults.appendChild(warningNoResults)
  } else if( barInput === "") {
    searchBarResults.innerHTML =""
  }
}


// BAR INPUT EVENT LISTENERS
barInput.addEventListener("focusin", toggleResultsView)
barInput.addEventListener("focusout", () => {
  setTimeout(() => {toggleResultsView()}, 100)
});
barInput.addEventListener("keyup", barInputBehavior)

// Window reference position
function temp() {
  let windowWidth = window.innerWidth
  if( windowWidth >= 600 ) {

    let position = nav.getBoundingClientRect()
    if(position.x >= 0) {
      searchBarResults.style.left = ""
      searchBarResults.style.right = `${position.x}px`
    } else {
      searchBarResults.style.right = ""
      searchBarResults.style.left = `${-position.x}px`
    }
  }
}

temp()

window.addEventListener("resize", temp)

window.addEventListener("click", () => {
  if(elementSelectedBySearchBar) {
    elementSelectedBySearchBar.style.border = "none";
    elementSelectedBySearchBar = "";
  }
})

// window.addEventListener("click", () => {
//   itemsAvailableToSearch.forEach( el => {
//     // el.style.animationName = ""
//   })
// })