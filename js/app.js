//constant variables declaration

const navBarItems = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section");

// casting sections to array data structure to iterate through it easily
const arraySection = Array.from(sections);

//Function to Build Navigation Bar Dynamically whenever any section is added
// Adds its navigation list on Navigation Bar

function buildNav() {
  //iterate on arraySection length
  for (let i = 0; i < arraySection.length; i++) {
    let section = arraySection[i];
    // text equals data-nav ex. Section 1 changes with every iteration
    const text = section.dataset.nav;
    //create list element
    const listAdd = document.createElement("li");
    //add text and html elements therefore I used innerHTML
    listAdd.innerHTML = `<li>
       <a href = "#${section.id}" data-nav ="${section.id}"  class="menu__link">
       ${text}
       </a>
       </li>
       `;
    navBarItems.appendChild(listAdd);
  }
}

//Focus active class on the on-window section
function activeSectionNow() {
  document.onscroll = function () {
    //iterate this time using forEach() method
    sections.forEach(function (event) {
      let navActive = navBarItems.querySelector(`[data-nav=${event.id}]`);
      // select on window section using getBoundingClientRect()
      if (
        event.getBoundingClientRect().top >= -300 &&
        event.getBoundingClientRect().top <= 300
      ) {
        // use class list to add classs for section called your-active-class
        event.classList.add("your-active-class");
        // use class list to add classs for navList called mine
        navActive.classList.add("mine");
      } else {
        //Remove classes when not in focus
        event.classList.remove("your-active-class");
        navActive.classList.remove("mine");
      }
    });
  };
}

//function of scrolling to selected section smoothly using arrow function
function goSectionSmooth() {
  navBarItems.addEventListener("click", (forward) => {
    forward.preventDefault();
    document
      .getElementById(forward.target.dataset.nav)
      .scrollIntoView({ behavior: "smooth" });
    // add timeout so it have time to add section number in URL
    setTimeout(() => {
      location.hash = `${forward.target.dataset.nav}`;
    }, 100);
    //call highlight function
    highlight(forward.target.dataset.nav);
  });
}

function highlight(id) {
  console.log(id);
  //cocatante to match URL
  let x = `#${id}`;
  // "[id='22']"
  let vv = document.querySelector(`[data-nav=${id}]`);
  let lightNav = document.querySelector(".mine");
  if (lightNav) {
    lightNav.classList.remove("mine");
  }
  vv.classList.add("mine");

  setTimeout(() => {}, 100);
}
// call functions to start main
buildNav();
goSectionSmooth();
activeSectionNow();
