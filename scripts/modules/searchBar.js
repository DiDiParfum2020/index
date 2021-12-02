// SELECTION of DOM ELEMENTS

const itemsAvailableToSearch = document.querySelectorAll(".article")
const itemsResume = []
const searchBarResults = document.getElementById("searchBarResults")
const barInput = document.getElementById("searchInput")

barInput.style.display = "none";

// SELECTION of ITEMS AVAILABLES TO SEARCH
addEventListener('load', () => {
  
  itemsAvailableToSearch.forEach( el => {
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
  
  barInput.style.display = "inline-block";
})

// FUNCTIONS remade CLASSES
function toggleResultsView() {
  barInput.value = ""
  searchBarResults.innerHTML = "";
  searchBarResults.classList.toggle("showBarInput")
}


// DATA
let barInputValue = "";
let elementSelectedBySearchBar = null;

function barInputBehavior ({target}) {
  barInputValue = target.value.toLowerCase()
  
  // ! eliminar elementos creados en memoria por cada busqueda
  searchBarResults.innerHTML = "";
  
  for(let i = 0; i < itemsResume.length; i++) {
    if( itemsResume[i].tittle.indexOf(barInputValue) !== -1 && barInput.value !== "") {
      const wrapper = document.createElement("div")
      wrapper.id = "searchBar__Wrapper"
      wrapper.classList.add("wrapperItem")
      itemsResume[i].imgProduct.classList.remove("article__img")
      itemsResume[i].imgProduct.classList.add("itemWrapped")
      wrapper.appendChild(itemsResume[i].imgProduct)
      
      const wrapperTittle = document.createElement("p") 
      wrapper.setAttribute('href', `#${itemsResume[i].title}` )
      wrapperTittle.textContent = itemsResume[i].tittle
      wrapper.appendChild(wrapperTittle)

      // ---------------------------------------------------------

      wrapper.addEventListener("click", ({target}) =>{
        // console.log("Article ScrollTop:", itemsResume[i].top);
        console.log(target)
        setTimeout(() => {
          itemsResume[i].element.style.border = "2px solid #f00"
          elementSelectedBySearchBar = itemsResume[i].element;
        }, 500);
        const scrollToArticle = itemsResume[i].top - 50;
        // console.log("Y to ScrollY:", scrollToArticle);
        window.scrollTo(0, scrollToArticle);
        // console.log("Window scrollY after scroll to Article:", window.scrollY);
        // console.log(
        //   "%c----------------------------", "color: lime;"
        // )
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
barInput.addEventListener("focus", toggleResultsView)
barInput.addEventListener("blur", () => {
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
// addEventListener('click', ({target}) => console.log(target))

document.addEventListener("click", ({target}) => {
  // console.log(searchBarResults.childNodes)
  // searchBarResults.childNodes.forEach( el => searchBarResults.removeChild(el))

  // console.log("1 -", elementSelectedBySearchBar)
  
  if( elementSelectedBySearchBar !== null ) {
    elementSelectedBySearchBar.style.border = "none";
    elementSelectedBySearchBar = null;
  }

})