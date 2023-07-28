// This script does exactly what its name suggests: it loads the navbar for any given page

let navbarElements = [];

// Create the navbar holder
const navbarHolder = document.createElement("div");
navbarHolder.id = "navbar-holder";

// Fetch the navbar html and apply it to the holder as inner html. This will load the navbar from the separate file for easy reusability on multiple sub-pages.
fetch("/navbar/nav.html").then(nav => nav.text()).then(navText => {
    navbarHolder.innerHTML = navText;
    document.body.prepend(navbarHolder);

    let navbarContainer = document.getElementById("navbar-container");
    navbarElements = navbarContainer.children;

    // Also preregister navbar elements and add an onclick callback
    for(let i = 0; i < navbarElements.length; i++) {
        navbarElements[i].classList.remove('active');
        navbarElements[i].onclick = function() { SelectPoint(i); };
    }

    document.getElementById("navbar-toggle").addEventListener("click", ToggleNavbar);
    
    if(screen.width < 600)
        ToggleNavbar();
});

// Shortly light up the currently selected topbar point
function SelectPoint(index) {
    return;

    // TODO: Fix this
    for(let i = 0; i < navbarElements.length; i++) {
        navbarElements[i].classList.remove('active');
    }

    navbarElements[index].classList.add('active');

    setTimeout(function() {
        navbarElements[index].classList.remove('active');
    }, 1000);
}

let navbar_enabled = true;

function ToggleNavbar() {
    navbar_enabled = !navbar_enabled;

    document.getElementById("navbar-container").style.display = navbar_enabled ? "flex" : "none";
}

// Deprecated version; In essence this works, but the embedded document cannot use the css elements of the main document/link to elements of it or stay in a fixed position
// Add navbar holder element
// const navbarHolder = document.createElement("object");
// navbarHolder.id = "navbar-holder";
// navbarHolder.data = "/navbar/nav.html";
// navbarHolder.style = "width: 100%; height: 100px; ";

// document.body.prepend(navbarHolder);