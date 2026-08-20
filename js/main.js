/* =========================================
   KINDLINK - MAIN JAVASCRIPT
   Phase 2.5.1
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("show");

            const isOpen = navMenu.classList.contains("show");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

        });


        /* Close menu after clicking a link */

        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("show");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =========================================
       CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
    ========================================= */

    document.addEventListener("click", (event) => {

        if (!menuToggle || !navMenu) return;

        const clickedInsideMenu =
            navMenu.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);

        if (
            !clickedInsideMenu &&
            !clickedToggle
        ) {

            navMenu.classList.remove("show");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    /* =========================================
       SMOOTH SCROLLING
    ========================================= */

    const anchorLinks =
        document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =========================================
       HANDLE HASH LINKS
       Example:
       index.html#causes
       index.html#emergency
    ========================================= */

    if (window.location.hash) {

        setTimeout(() => {

            const target =
                document.querySelector(
                    window.location.hash
                );

            if (target) {

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }, 300);

    }


    /* =========================================
       ESCAPE KEY
       Close mobile menu
    ========================================= */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            if (navMenu) {
                navMenu.classList.remove("show");
            }

            if (menuToggle) {
                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        }

    });


    /* =========================================
       CURRENT PAGE ACTIVE NAVIGATION
    ========================================= */

    const currentPage =
        window.location.pathname.split("/").pop();

    const allNavLinks =
        document.querySelectorAll(".nav-menu a");

    allNavLinks.forEach(link => {

        const href =
            link.getAttribute("href");

        if (!href) return;

        /*
           Don't remove manually assigned active
           state from homepage anchor links.
        */

        if (
            href === currentPage ||
            (
                currentPage === "" &&
                href === "index.html"
            )
        ) {

            link.classList.add("active");

        }

    });

});