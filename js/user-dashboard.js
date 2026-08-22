// ==========================================
// KINDLINK USER DASHBOARD
// ==========================================


// ==========================================
// AUTHENTICATION CHECK
// ==========================================

const token = localStorage.getItem("kindlinkToken");

if (!token) {
    window.location.replace("login.html");
}


// ==========================================
// DOM ELEMENTS
// ==========================================

const sidebarLinks =
    document.querySelectorAll(".sidebar-link");

const sections =
    document.querySelectorAll(".dashboard-section");

const sidebar =
    document.getElementById("sidebar");

const menuBtn =
    document.getElementById("menuBtn");

const interests =
    document.querySelectorAll(".interest");

const profileForm =
    document.getElementById("profileForm");

const profileMessage =
    document.getElementById("profileMessage");

const savedButtons =
    document.querySelectorAll(".saved-actions button");

const logoutBtn =
    document.getElementById("logoutBtn");


// ==========================================
// VERIFY USER WITH BACKEND
// ==========================================

async function verifyUser() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/auth/profile",
            {
                method: "GET",

                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );


        const data =
            await response.json();


        if (!response.ok) {

            clearLoginData();

            window.location.replace(
                "login.html"
            );

            return;
        }


        displayUserData(data.user);


    } catch (error) {

        console.error(
            "Authentication error:",
            error
        );

    }

}


verifyUser();


// ==========================================
// DISPLAY LOGGED-IN USER
// ==========================================

function displayUserData(user) {

    const topUserName =
        document.getElementById(
            "topUserName"
        );

    const welcomeUserName =
        document.getElementById(
            "welcomeUserName"
        );

    const topUserAvatar =
        document.getElementById(
            "topUserAvatar"
        );

    const profileAvatar =
        document.getElementById(
            "profileAvatar"
        );

    const profileFullName =
        document.getElementById(
            "profileFullName"
        );

    const profileName =
        document.getElementById(
            "profileName"
        );

    const profileEmail =
        document.getElementById(
            "profileEmail"
        );

    const profilePhone =
        document.getElementById(
            "profilePhone"
        );

    const profileRole =
        document.getElementById(
            "profileRole"
        );


    // ==========================================
    // TOPBAR USER NAME
    // ==========================================

    if (topUserName) {

        topUserName.textContent =
            user.name || "KindLink User";

    }


    // ==========================================
    // WELCOME MESSAGE
    // ==========================================

    if (welcomeUserName) {

        const firstName =
            user.name
                ? user.name.trim().split(" ")[0]
                : "User";


        welcomeUserName.textContent =
            firstName;

    }


    // ==========================================
    // PROFILE NAME
    // ==========================================

    if (profileFullName) {

        profileFullName.textContent =
            user.name || "KindLink User";

    }


    // ==========================================
    // PROFILE FORM VALUES
    // ==========================================

    if (profileName) {

        profileName.value =
            user.name || "";

    }


    if (profileEmail) {

        profileEmail.value =
            user.email || "";

    }


    if (profilePhone) {

        profilePhone.value =
            user.phone || "";

    }


    if (profileRole) {

        profileRole.value =
            user.role || "user";

    }


    // ==========================================
    // USER INITIALS
    // ==========================================

    const initials =
        getInitials(user.name);


    if (topUserAvatar) {

        topUserAvatar.textContent =
            initials;

    }


    if (profileAvatar) {

        profileAvatar.textContent =
            initials;

    }


    // ==========================================
    // SAVE CURRENT USER LOCALLY
    // ==========================================

    localStorage.setItem(
        "kindlinkUser",
        JSON.stringify(user)
    );

}


// ==========================================
// GET USER INITIALS
// ==========================================

function getInitials(name) {

    if (!name) {

        return "KL";

    }


    const parts =
        name
            .trim()
            .split(/\s+/);


    if (parts.length === 1) {

        return parts[0]
            .substring(0, 2)
            .toUpperCase();

    }


    return (
        parts[0][0] +
        parts[parts.length - 1][0]
    ).toUpperCase();

}


// ==========================================
// CLEAR LOGIN DATA
// ==========================================

function clearLoginData() {

    localStorage.removeItem(
        "kindlinkToken"
    );

    localStorage.removeItem(
        "kindlinkUser"
    );

    localStorage.removeItem(
        "kindlinkAccountType"
    );

}


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


                // Remove active class
                // from sidebar links

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


                // Hide all sections

                sections.forEach(
                    function (section) {

                        section.classList.remove(
                            "active-section"
                        );

                    }
                );


                // Show selected section

                const targetSection =
                    document.getElementById(
                        target
                    );


                if (targetSection) {

                    targetSection.classList.add(
                        "active-section"
                    );

                }


                // Close sidebar
                // on mobile devices

                if (
                    window.innerWidth <= 850 &&
                    sidebar
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

if (menuBtn && sidebar) {

    menuBtn.addEventListener(
        "click",
        function () {

            sidebar.classList.toggle(
                "show"
            );

        }
    );

}


// ==========================================
// PROFILE INTERESTS
// ==========================================

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

if (profileForm) {

    profileForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            if (profileMessage) {

                profileMessage.textContent =
                    "Profile changes saved for this demo.";

            }


            setTimeout(
                function () {

                    if (profileMessage) {

                        profileMessage.textContent =
                            "";

                    }

                },
                3000
            );

        }
    );

}


// ==========================================
// SAVED CAUSES
// ==========================================

savedButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const card =
                    button.closest(
                        ".saved-card"
                    );


                if (!card) {
                    return;
                }


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

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function () {

            // Remove authentication
            // information

            clearLoginData();


            // Redirect to login page

            window.location.replace(
                "login.html"
            );

        }
    );

}