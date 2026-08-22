// ==========================================
// KINDLINK ORGANISATION DASHBOARD
// ==========================================


// ==========================================
// SIDEBAR NAVIGATION
// ==========================================

const sidebarLinks =
    document.querySelectorAll(
        ".sidebar-link"
    );

const dashboardSections =
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


function openSection(sectionId) {

    dashboardSections.forEach(
        function (section) {

            section.classList.remove(
                "active-section"
            );

        }
    );


    sidebarLinks.forEach(
        function (link) {

            link.classList.remove(
                "active"
            );

        }
    );


    const section =
        document.getElementById(
            sectionId
        );


    if (section) {

        section.classList.add(
            "active-section"
        );

    }


    const matchingLink =
        document.querySelector(
            `.sidebar-link[data-section="${sectionId}"]`
        );


    if (matchingLink) {

        matchingLink.classList.add(
            "active"
        );

    }

}


sidebarLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                openSection(
                    link.dataset.section
                );


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
// QUICK "VIEW ALL"
// ==========================================

const goButtons =
    document.querySelectorAll(
        "[data-go]"
    );


goButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                openSection(
                    button.dataset.go
                );

            }
        );

    }
);


// ==========================================
// MOBILE SIDEBAR
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
// MODALS
// ==========================================

const modalButtons =
    document.querySelectorAll(
        "[data-open]"
    );

const closeModalButtons =
    document.querySelectorAll(
        ".close-modal"
    );

const modalOverlays =
    document.querySelectorAll(
        ".modal-overlay"
    );


modalButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const modal =
                    document.getElementById(
                        button.dataset.open
                    );


                if (modal) {

                    modal.classList.add(
                        "show"
                    );

                }

            }
        );

    }
);


closeModalButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const modal =
                    button.closest(
                        ".modal-overlay"
                    );


                modal.classList.remove(
                    "show"
                );

            }
        );

    }
);


// CLOSE WHEN CLICKING OUTSIDE

modalOverlays.forEach(
    function (modal) {

        modal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === modal &&
                    modal.id !== "logoutModal"
                ) {

                    modal.classList.remove(
                        "show"
                    );

                }

            }
        );

    }
);


// ==========================================
// DEMO CREATE FORMS
// ==========================================

const demoForms =
    document.querySelectorAll(
        ".demo-form"
    );


demoForms.forEach(
    function (form) {

        form.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const modal =
                    form.closest(
                        ".modal-overlay"
                    );


                modal.classList.remove(
                    "show"
                );


                form.reset();


                showToast(
                    "Your demo item has been created successfully."
                );


                /*
                ====================================

                BACKEND PHASE

                These forms will later connect to:

                POST /api/campaigns

                POST /api/volunteer-opportunities

                POST /api/animals

                POST /api/emergencies

                ====================================
                */

            }
        );

    }
);


// ==========================================
// APPLICATION TABS
// ==========================================

const applicationTabs =
    document.querySelectorAll(
        ".application-tab"
    );

const applicationContents =
    document.querySelectorAll(
        ".application-content"
    );


applicationTabs.forEach(
    function (tab) {

        tab.addEventListener(
            "click",
            function () {

                applicationTabs.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                applicationContents.forEach(
                    function (content) {

                        content.classList.remove(
                            "active"
                        );

                    }
                );


                tab.classList.add(
                    "active"
                );


                document
                    .getElementById(
                        tab.dataset.tab
                    )
                    .classList
                    .add(
                        "active"
                    );

            }
        );

    }
);


// ==========================================
// APPLICATION ACCEPT / REJECT
// ==========================================

const acceptButtons =
    document.querySelectorAll(
        ".accept-btn"
    );

const rejectButtons =
    document.querySelectorAll(
        ".reject-btn"
    );


acceptButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const row =
                    button.closest("tr");


                const status =
                    row.querySelector(
                        ".status"
                    );


                status.textContent =
                    "Accepted";


                status.className =
                    "status active";


                const actions =
                    row.querySelector(
                        ".table-actions"
                    );


                actions.innerHTML =
                    "<span class='decision-text'>Application accepted</span>";


                showToast(
                    "Application accepted."
                );

            }
        );

    }
);


rejectButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const row =
                    button.closest("tr");


                const status =
                    row.querySelector(
                        ".status"
                    );


                status.textContent =
                    "Rejected";


                status.className =
                    "status rejected";


                const actions =
                    row.querySelector(
                        ".table-actions"
                    );


                actions.innerHTML =
                    "<span class='decision-text'>Application rejected</span>";


                showToast(
                    "Application rejected."
                );

            }
        );

    }
);


// ==========================================
// PROFILE
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
            "Organisation profile saved for this demo.";


        setTimeout(
            function () {

                profileMessage.textContent =
                    "";

            },
            3000
        );


        /*
        BACKEND:

        PUT /api/organisations/profile
        */

    }
);


// ==========================================
// STORY BUTTON
// ==========================================

const newStoryBtn =
    document.getElementById(
        "newStoryBtn"
    );


newStoryBtn.addEventListener(
    "click",
    function () {

        showToast(
            "Story publishing form will be connected during the backend phase."
        );

    }
);


// ==========================================
// TOAST
// ==========================================

const toast =
    document.getElementById(
        "toast"
    );

const toastMessage =
    document.getElementById(
        "toastMessage"
    );


function showToast(message) {

    toastMessage.textContent =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(
        function () {

            toast.classList.remove(
                "show"
            );

        },
        3000
    );

}


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
        BACKEND:

        Clear login token/session.
        */

        window.location.href =
            "login.html";

    }
);


// ==========================================
// LOGOUT OUTSIDE CLICK
// ==========================================

logoutModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target === logoutModal
        ) {

            logoutModal.classList.remove(
                "show"
            );

        }

    }
);