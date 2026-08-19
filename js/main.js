/* =========================================
   KINDLINK - MAIN JAVASCRIPT
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");


// Mobile Navigation

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("show");

});


// Close mobile menu when a link is clicked

const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("show");

    });

});