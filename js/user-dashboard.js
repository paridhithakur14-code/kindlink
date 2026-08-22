// ==========================================
// KINDLINK USER DASHBOARD
// ==========================================


// ==========================================
// ELEMENTS
// ==========================================

const sidebarLinks =
    document.querySelectorAll(
        ".sidebar-link"
    );

const sections =
    document.querySelectorAll(
        ".dashboard-section"
    );

const sidebar =
    document.getElementById(
        "sidebar"
    );

const menuBtn =
    document.getElementById(
        "menuBtn"
    );


// ==========================================
// SIDEBAR NAVIGATION
// ==========================================

sidebarLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const target =
                    link.dataset.section;


                // REMOVE ACTIVE FROM LINKS

                sidebarLinks.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                link.classList.add(
                    "active"
                );


                // HIDE ALL SECTIONS

                sections.forEach(
                    function (section) {

                        section.classList.remove(
                            "active-section"
                        );

                    }
                );


                // SHOW SELECTED SECTION

                const targetSection =
                    document.getElementById(
                        target
                    );


                if (targetSection) {

                    targetSection.classList.add(
                        "active-section"
                    );

                }


                // CLOSE MOBILE SIDEBAR

                if (
                    window.innerWidth <= 850
                ) {

                    sidebar.classList.remove(
                        "show"
                    );

                }

            }
        );

    }
);


// ==========================================
// MOBILE MENU
// ==========================================

menuBtn.addEventListener(
    "click",
    function () {

        sidebar.classList.toggle(
            "show"
        );

    }
);


// ==========================================
// PROFILE INTERESTS
// ==========================================

const interests =
    document.querySelectorAll(
        ".interest"
    );


interests.forEach(
    function (interest) {

        interest.addEventListener(
            "click",
            function () {

                interest.classList.toggle(
                    "active"
                );

            }
        );

    }
);


// ==========================================
// PROFILE FORM
// ==========================================

const profileForm =
    document.getElementById(
        "profileForm"
    );

const profileMessage =
    document.getElementById(
        "profileMessage"
    );


profileForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        profileMessage.textContent =
            "Profile changes saved for this demo.";


        setTimeout(
            function () {

                profileMessage.textContent =
                    "";

            },
            3000
        );


        /*
        ======================================

        BACKEND PHASE

        This will later become:

        PUT /api/users/profile

        and update the logged-in user's
        MongoDB profile.

        ======================================
        */

    }
);


// ==========================================
// SAVED CAUSES
// ==========================================

const savedButtons =
    document.querySelectorAll(
        ".saved-actions button"
    );


savedButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const card =
                    button.closest(
                        ".saved-card"
                    );


                card.style.opacity =
                    "0";


                setTimeout(
                    function () {

                        card.remove();

                    },
                    300
                );

            }
        );

    }
);


// ==========================================
// LOGOUT
// ==========================================

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );

const logoutModal =
    document.getElementById(
        "logoutModal"
    );

const cancelLogout =
    document.getElementById(
        "cancelLogout"
    );

const confirmLogout =
    document.getElementById(
        "confirmLogout"
    );


logoutBtn.addEventListener(
    "click",
    function () {

        logoutModal.classList.add(
            "show"
        );

    }
);


cancelLogout.addEventListener(
    "click",
    function () {

        logoutModal.classList.remove(
            "show"
        );

    }
);


confirmLogout.addEventListener(
    "click",
    function () {

        /*
        ======================================

        BACKEND PHASE

        Later we will remove the user's
        authentication token/session here.

        ======================================
        */


        window.location.href =
            "login.html";

    }
);


// ==========================================
// CLOSE MODAL ON OUTSIDE CLICK
// ==========================================

logoutModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            logoutModal
        ) {

            logoutModal.classList.remove(
                "show"
            );

        }

    }
);