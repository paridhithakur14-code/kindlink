// ==========================================
// KINDLINK USER DASHBOARD
// ==========================================


// ==========================================
// API
// ==========================================

const API_URL =
    "http://localhost:5000";


// ==========================================
// AUTHENTICATION
// ==========================================

const token =
    localStorage.getItem(
        "kindlinkToken"
    );


const accountType =
    localStorage.getItem(
        "kindlinkAccountType"
    );


if (
    !token ||
    accountType !== "user"
) {

    window.location.replace(
        "login.html"
    );

}


// ==========================================
// DOM ELEMENTS
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


const interests =
    document.querySelectorAll(
        ".interest"
    );


const profileForm =
    document.getElementById(
        "profileForm"
    );


const profileMessage =
    document.getElementById(
        "profileMessage"
    );


const savedButtons =
    document.querySelectorAll(
        ".saved-actions button"
    );


const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );


const totalDonatedAmount =
    document.getElementById(
        "totalDonatedAmount"
    );


const donationCampaignCount =
    document.getElementById(
        "donationCampaignCount"
    );


const donationTableBody =
    document.getElementById(
        "donationTableBody"
    );


// ==========================================
// VERIFY USER
// ==========================================

async function verifyUser() {

    try {

        const response =
            await fetch(

                `${API_URL}/api/auth/profile`,

                {

                    method:
                        "GET",

                    headers: {

                        Authorization:
                            `Bearer ${token}`

                    }

                }

            );


        const data =
            await response.json();


        if (
            response.status === 401 ||
            response.status === 403
        ) {

            clearLoginData();


            window.location.replace(
                "login.html"
            );


            return false;

        }


        if (!response.ok) {

            console.error(
                data.message
            );


            return false;

        }


        displayUserData(
            data.user
        );


        return true;


    } catch (error) {

        console.error(
            "Authentication error:",
            error
        );


        return false;

    }

}


// ==========================================
// DISPLAY USER
// ==========================================

function displayUserData(
    user
) {

    if (!user) {

        return;

    }


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


    // ======================================
    // NAME
    // ======================================

    if (topUserName) {

        topUserName.textContent =
            user.name ||
            "KindLink User";

    }


    if (welcomeUserName) {

        welcomeUserName.textContent =
            user.name
                ? user.name
                    .trim()
                    .split(" ")[0]
                : "User";

    }


    if (profileFullName) {

        profileFullName.textContent =
            user.name ||
            "KindLink User";

    }


    // ======================================
    // FORM
    // ======================================

    if (profileName) {

        profileName.value =
            user.name ||
            "";

    }


    if (profileEmail) {

        profileEmail.value =
            user.email ||
            "";

    }


    if (profilePhone) {

        profilePhone.value =
            user.phone ||
            "";

    }


    if (profileRole) {

        profileRole.value =
            user.role ||
            "user";

    }


    // ======================================
    // INITIALS
    // ======================================

    const initials =
        getInitials(
            user.name
        );


    if (topUserAvatar) {

        topUserAvatar.textContent =
            initials;

    }


    if (profileAvatar) {

        profileAvatar.textContent =
            initials;

    }


    // ======================================
    // SAVE CURRENT USER
    // ======================================

    localStorage.setItem(

        "kindlinkUser",

        JSON.stringify(
            user
        )

    );

}


// ==========================================
// USER INITIALS
// ==========================================

function getInitials(
    name
) {

    if (!name) {

        return "KL";

    }


    const parts =
        name
            .trim()
            .split(/\s+/);


    if (
        parts.length === 1
    ) {

        return parts[0]
            .substring(
                0,
                2
            )
            .toUpperCase();

    }


    return (

        parts[0][0] +

        parts[
            parts.length - 1
        ][0]

    ).toUpperCase();

}


// ==========================================
// LOAD USER DONATIONS
// ==========================================

async function loadMyDonations() {

    try {

        const response =
            await fetch(

                `${API_URL}/api/donations/my`,

                {

                    method:
                        "GET",

                    headers: {

                        Authorization:
                            `Bearer ${token}`

                    }

                }

            );


        const data =
            await response.json();


        // ==================================
        // AUTH FAILED
        // ==================================

        if (
            response.status === 401 ||
            response.status === 403
        ) {

            clearLoginData();


            window.location.replace(
                "login.html"
            );


            return;

        }


        // ==================================
        // REQUEST FAILED
        // ==================================

        if (!response.ok) {

            console.error(
                "Unable to load donations:",
                data.message
            );


            displayDonationError();


            return;

        }


        const donations =
            Array.isArray(
                data.donations
            )
                ? data.donations
                : [];


        // ==================================
        // UPDATE STATS
        // ==================================

        const total =
            Number(
                data.summary
                    ?.totalDonated
            ) || 0;


        const campaignsSupported =
            Number(
                data.summary
                    ?.campaignsSupported
            ) || 0;


        if (totalDonatedAmount) {

            totalDonatedAmount.textContent =

                `₹${total.toLocaleString(
                    "en-IN"
                )}`;

        }


        if (donationCampaignCount) {

            donationCampaignCount.textContent =

                `Across ${campaignsSupported} campaign${
                    campaignsSupported === 1
                        ? ""
                        : "s"
                }`;

        }


        displayDonations(
            donations
        );


    } catch (error) {

        console.error(
            "Donation Load Error:",
            error
        );


        displayDonationError();

    }

}


// ==========================================
// DISPLAY DONATIONS
// ==========================================

function displayDonations(
    donations
) {

    if (!donationTableBody) {

        return;

    }


    // ==================================
    // NO DONATIONS
    // ==================================

    if (
        !donations ||
        donations.length === 0
    ) {

        donationTableBody.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    style="
                        text-align:center;
                        padding:30px;
                    "
                >

                    You haven't made any donations yet.

                </td>

            </tr>

        `;


        return;

    }


    // ==================================
    // ROWS
    // ==================================

    donationTableBody.innerHTML =

        donations
            .map(
                donation => {

                    const campaignName =
                        donation
                            .campaign
                            ?.title ||
                        "Campaign";


                    const organisationName =
                        donation
                            .organisation
                            ?.organisationName ||
                        "KindLink Organisation";


                    const amount =
                        Number(
                            donation.amount
                        ) || 0;


                    const status =
                        donation.status ||
                        "completed";


                    const date =
                        formatDonationDate(
                            donation.createdAt
                        );


                    return `

                        <tr>

                            <td>

                                ${escapeHTML(
                                    campaignName
                                )}

                            </td>


                            <td>

                                ${escapeHTML(
                                    organisationName
                                )}

                            </td>


                            <td>

                                ${escapeHTML(
                                    date
                                )}

                            </td>


                            <td class="amount">

                                ₹${amount.toLocaleString(
                                    "en-IN"
                                )}

                            </td>


                            <td>

                                <span
                                    class="status ${escapeHTML(
                                        status
                                    )}"
                                >

                                    ${escapeHTML(
                                        capitalize(
                                            status
                                        )
                                    )}

                                </span>

                            </td>

                        </tr>

                    `;

                }
            )
            .join("");

}


// ==========================================
// DONATION ERROR
// ==========================================

function displayDonationError() {

    if (!donationTableBody) {

        return;

    }


    donationTableBody.innerHTML = `

        <tr>

            <td
                colspan="5"
                style="
                    text-align:center;
                    padding:30px;
                "
            >

                Unable to load your donations.
                Make sure the backend server is running.

            </td>

        </tr>

    `;

}


// ==========================================
// FORMAT DATE
// ==========================================

function formatDonationDate(
    value
) {

    if (!value) {

        return "-";

    }


    const date =
        new Date(
            value
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "-";

    }


    return date.toLocaleDateString(
        "en-IN",
        {

            day:
                "2-digit",

            month:
                "short",

            year:
                "numeric"

        }
    );

}


// ==========================================
// CAPITALIZE
// ==========================================

function capitalize(
    value
) {

    if (!value) {

        return "";

    }


    return (

        value
            .charAt(0)
            .toUpperCase() +

        value.slice(1)

    );

}


// ==========================================
// ESCAPE HTML
// ==========================================

function escapeHTML(
    value
) {

    return String(
        value ?? ""
    )

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

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
    link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();


                const target =
                    link.dataset.section;


                sidebarLinks.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                link.classList.add(
                    "active"
                );


                sections.forEach(
                    section => {

                        section.classList.remove(
                            "active-section"
                        );

                    }
                );


                const targetSection =
                    document.getElementById(
                        target
                    );


                if (targetSection) {

                    targetSection.classList.add(
                        "active-section"
                    );

                }


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

if (
    menuBtn &&
    sidebar
) {

    menuBtn.addEventListener(
        "click",
        () => {

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
    interest => {

        interest.addEventListener(
            "click",
            () => {

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
        event => {

            event.preventDefault();


            if (profileMessage) {

                profileMessage.textContent =
                    "Profile editing backend will be connected later.";

            }


            setTimeout(
                () => {

                    if (
                        profileMessage
                    ) {

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
    button => {

        button.addEventListener(
            "click",
            () => {

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
                    () => {

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
        () => {

            clearLoginData();


            window.location.replace(
                "login.html"
            );

        }
    );

}


// ==========================================
// INITIAL DASHBOARD LOAD
// ==========================================

async function initialiseDashboard() {

    const authenticated =
        await verifyUser();


    if (!authenticated) {

        return;

    }


    await loadMyDonations();

}


initialiseDashboard();