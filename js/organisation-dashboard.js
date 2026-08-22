// ==========================================
// KINDLINK ORGANISATION DASHBOARD
// ==========================================


// ==========================================
// API BASE URL
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


// Organisation must be logged in

if (
    !token ||
    accountType !== "organisation"
) {

    window.location.replace(
        "login.html"
    );

}



// ==========================================
// CLEAR LOGIN DATA
// ==========================================

function clearOrganisationLogin() {

    localStorage.removeItem(
        "kindlinkToken"
    );

    localStorage.removeItem(
        "kindlinkOrganisation"
    );

    localStorage.removeItem(
        "kindlinkAccountType"
    );

    localStorage.removeItem(
        "kindlinkUser"
    );

}



// ==========================================
// VERIFY ORGANISATION
// ==========================================

async function verifyOrganisation() {

    try {

        const response =
            await fetch(
                `${API_URL}/api/organisations/auth/profile`,
                {

                    method: "GET",

                    headers: {

                        Authorization:
                            `Bearer ${token}`

                    }

                }
            );


        let data = {};


        try {

            data =
                await response.json();

        } catch (error) {

            console.error(
                "Unable to read profile response."
            );

        }


        // ======================================
        // INVALID TOKEN
        // ======================================

        if (
            response.status === 401 ||
            response.status === 403
        ) {

            clearOrganisationLogin();

            window.location.replace(
                "login.html"
            );

            return;

        }


        if (!response.ok) {

            console.error(
                "Organisation verification failed:",
                data.message
            );

            return;

        }


        // ======================================
        // SAVE CURRENT ORGANISATION
        // ======================================

        localStorage.setItem(
            "kindlinkOrganisation",
            JSON.stringify(
                data.organisation
            )
        );


        // ======================================
        // DISPLAY ORGANISATION
        // ======================================

        displayOrganisationData(
            data.organisation
        );


    } catch (error) {

        console.error(
            "Organisation authentication error:",
            error
        );

    }

}



// ==========================================
// DISPLAY ORGANISATION DATA
// ==========================================

function displayOrganisationData(
    organisation
) {

    if (!organisation) {

        return;

    }


    const name =
        organisation.organisationName ||
        "KindLink Organisation";


    const initials =
        getOrganisationInitials(
            name
        );



    // ======================================
    // TOPBAR
    // ======================================

    setText(
        "topOrganisationName",
        name
    );


    setText(
        "topOrganisationAvatar",
        initials
    );



    // ======================================
    // WELCOME
    // ======================================

    setText(
        "welcomeOrganisationName",
        name
    );



    // ======================================
    // PROFILE HEADER
    // ======================================

    setText(
        "profileOrganisationName",
        name
    );


    setText(
        "profileOrganisationAvatar",
        initials
    );



    // ======================================
    // LOCATION
    // ======================================

    if (organisation.location) {

        const city =
            organisation.location.city ||
            "";

        const state =
            organisation.location.state ||
            "";


        let locationText =
            "Location not provided";


        if (city && state) {

            locationText =
                `${city}, ${state}`;

        } else if (city) {

            locationText =
                city;

        } else if (state) {

            locationText =
                state;

        }


        setText(
            "profileOrganisationLocation",
            locationText
        );

    }



    // ======================================
    // VERIFICATION STATUS
    // ======================================

    const status =
        organisation.verificationStatus ||
        "pending";


    const verificationElement =
        document.getElementById(
            "verificationStatus"
        );


    if (verificationElement) {

        verificationElement.innerHTML =
            getVerificationIcon(status) +
            " " +
            formatStatus(status);


        verificationElement.classList.remove(
            "pending",
            "verified",
            "rejected"
        );


        verificationElement.classList.add(
            status
        );

    }


    setText(
        "topOrganisationStatus",
        `${formatStatus(status)} Organisation`
    );



    // ======================================
    // PROFILE FORM
    // ======================================

    setInputValue(
        "profileOrganisationNameInput",
        organisation.organisationName
    );


    setInputValue(
        "profileOrganisationType",
        organisation.organisationType
    );


    setInputValue(
        "profileEmail",
        organisation.email
    );


    setInputValue(
        "profilePhone",
        organisation.phone
    );



    // ======================================
    // CONTACT PERSON
    // ======================================

    if (organisation.contactPerson) {

        setInputValue(
            "profileContactName",
            organisation.contactPerson.name
        );


        setInputValue(
            "profileDesignation",
            organisation.contactPerson.designation
        );

    }



    // ======================================
    // ADDRESS
    // ======================================

    if (organisation.location) {

        setInputValue(
            "profileAddress",
            organisation.location.address
        );


        setInputValue(
            "profileCity",
            organisation.location.city
        );


        setInputValue(
            "profileState",
            organisation.location.state
        );

    }



    setInputValue(
        "profileDescription",
        organisation.description
    );


    setInputValue(
        "profileWebsite",
        organisation.website
    );


    setInputValue(
        "profileSocialLink",
        organisation.socialLink
    );

}



// ==========================================
// GET VERIFICATION ICON
// ==========================================

function getVerificationIcon(status) {

    if (status === "verified") {

        return '<i class="fa-solid fa-circle-check"></i>';

    }


    if (status === "rejected") {

        return '<i class="fa-solid fa-circle-xmark"></i>';

    }


    return '<i class="fa-solid fa-clock"></i>';

}



// ==========================================
// SET TEXT
// ==========================================

function setText(
    id,
    value
) {

    const element =
        document.getElementById(
            id
        );


    if (element) {

        element.textContent =
            value || "";

    }

}



// ==========================================
// SET INPUT VALUE
// ==========================================

function setInputValue(
    id,
    value
) {

    const element =
        document.getElementById(
            id
        );


    if (
        element &&
        value !== undefined &&
        value !== null
    ) {

        element.value =
            value;

    }

}



// ==========================================
// ORGANISATION INITIALS
// ==========================================

function getOrganisationInitials(name) {

    if (!name) {

        return "KL";

    }


    const words =
        name
            .trim()
            .split(/\s+/);


    if (words.length === 1) {

        return words[0]
            .substring(0, 2)
            .toUpperCase();

    }


    return (
        words[0][0] +
        words[
            words.length - 1
        ][0]
    ).toUpperCase();

}



// ==========================================
// FORMAT STATUS
// ==========================================

function formatStatus(status) {

    if (!status) {

        return "Pending";

    }


    return (
        status.charAt(0).toUpperCase() +
        status.slice(1)
    );

}



// ==========================================
// SIDEBAR
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



// ==========================================
// OPEN DASHBOARD SECTION
// ==========================================

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


    const targetSection =
        document.getElementById(
            sectionId
        );


    if (targetSection) {

        targetSection.classList.add(
            "active-section"
        );

    }


    const targetLink =
        document.querySelector(
            `.sidebar-link[data-section="${sectionId}"]`
        );


    if (targetLink) {

        targetLink.classList.add(
            "active"
        );

    }

}



// ==========================================
// SIDEBAR LINKS
// ==========================================

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
// VIEW ALL BUTTONS
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

if (
    menuBtn &&
    sidebar
) {

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



// ==========================================
// OPEN MODAL
// ==========================================

modalButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const modalId =
                    button.dataset.open;


                const modal =
                    document.getElementById(
                        modalId
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



// ==========================================
// CLOSE MODAL BUTTON
// ==========================================

closeModalButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const modal =
                    button.closest(
                        ".modal-overlay"
                    );


                if (modal) {

                    modal.classList.remove(
                        "show"
                    );

                }

            }
        );

    }
);



// ==========================================
// CLOSE MODAL OUTSIDE
// ==========================================

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
// CREATE CAMPAIGN
// ==========================================

const createCampaignForm =
    document.getElementById(
        "createCampaignForm"
    );


if (createCampaignForm) {

    createCampaignForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const organisationToken =
                localStorage.getItem(
                    "kindlinkToken"
                );


            if (!organisationToken) {

                clearOrganisationLogin();

                window.location.replace(
                    "login.html"
                );

                return;

            }



            // ==================================
            // VALUES
            // ==================================

            const title =
                document
                    .getElementById(
                        "campaignTitle"
                    )
                    .value
                    .trim();


            const category =
                document
                    .getElementById(
                        "campaignCategory"
                    )
                    .value;


            const description =
                document
                    .getElementById(
                        "campaignDescription"
                    )
                    .value
                    .trim();


            const goalAmount =
                Number(
                    document
                        .getElementById(
                            "campaignGoal"
                        )
                        .value
                );


            const city =
                document
                    .getElementById(
                        "campaignCity"
                    )
                    .value
                    .trim();


            const state =
                document
                    .getElementById(
                        "campaignState"
                    )
                    .value
                    .trim();


            const startDate =
                document
                    .getElementById(
                        "campaignStartDate"
                    )
                    .value;


            const endDate =
                document
                    .getElementById(
                        "campaignEndDate"
                    )
                    .value;


            const image =
                document
                    .getElementById(
                        "campaignImage"
                    )
                    .value
                    .trim();



            // ==================================
            // VALIDATION
            // ==================================

            if (
                !title ||
                !category ||
                !description ||
                !goalAmount
            ) {

                showToast(
                    "Please fill all required campaign fields."
                );

                return;

            }


            if (goalAmount <= 0) {

                showToast(
                    "Campaign goal must be greater than ₹0."
                );

                return;

            }


            if (
                startDate &&
                endDate &&
                new Date(endDate) <
                new Date(startDate)
            ) {

                showToast(
                    "End date cannot be before start date."
                );

                return;

            }



            const submitButton =
                document.getElementById(
                    "createCampaignSubmitBtn"
                );


            if (submitButton) {

                submitButton.disabled =
                    true;


                submitButton.innerHTML =
                    '<i class="fa-solid fa-spinner fa-spin"></i> Creating...';

            }



            try {

                // ==================================
                // REQUEST BODY
                // ==================================

                const campaignData = {

                    title,

                    category,

                    description,

                    goalAmount,

                    location: {

                        city,

                        state

                    },

                    image

                };


                if (startDate) {

                    campaignData.startDate =
                        startDate;

                }


                if (endDate) {

                    campaignData.endDate =
                        endDate;

                }



                // ==================================
                // POST CAMPAIGN
                // ==================================

                const response =
                    await fetch(
                        `${API_URL}/api/campaigns`,
                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json",

                                Authorization:
                                    `Bearer ${organisationToken}`

                            },

                            body:
                                JSON.stringify(
                                    campaignData
                                )

                        }
                    );



                let data = {};


                try {

                    data =
                        await response.json();

                } catch (error) {

                    console.error(
                        "Invalid server response."
                    );

                }



                // ==================================
                // AUTH FAILED
                // ==================================

                if (
                    response.status === 401 ||
                    response.status === 403
                ) {

                    clearOrganisationLogin();

                    window.location.replace(
                        "login.html"
                    );

                    return;

                }



                // ==================================
                // FAILED
                // ==================================

                if (!response.ok) {

                    showToast(
                        data.message ||
                        "Unable to create campaign."
                    );

                    return;

                }



                // ==================================
                // SUCCESS
                // ==================================

                showToast(
                    "Campaign created successfully!"
                );


                createCampaignForm.reset();


                const campaignModal =
                    document.getElementById(
                        "campaignModal"
                    );


                if (campaignModal) {

                    campaignModal.classList.remove(
                        "show"
                    );

                }


                // Reload campaigns from MongoDB

                await loadOrganisationCampaigns();


                // Show campaign page

                openSection(
                    "campaigns"
                );


            } catch (error) {

                console.error(
                    "Create Campaign Error:",
                    error
                );


                showToast(
                    "Unable to connect to the KindLink server."
                );

            } finally {

                if (submitButton) {

                    submitButton.disabled =
                        false;


                    submitButton.innerHTML =
                        '<i class="fa-solid fa-plus"></i> Create Campaign';

                }

            }

        }
    );

}



// ==========================================
// LOAD ORGANISATION CAMPAIGNS
// ==========================================

async function loadOrganisationCampaigns() {

    const organisationToken =
        localStorage.getItem(
            "kindlinkToken"
        );


    if (!organisationToken) {

        return;

    }


    try {

        const response =
            await fetch(
                `${API_URL}/api/campaigns/organisation/mine`,
                {

                    method: "GET",

                    headers: {

                        Authorization:
                            `Bearer ${organisationToken}`

                    }

                }
            );



        let data = {};


        try {

            data =
                await response.json();

        } catch (error) {

            console.error(
                "Invalid campaign response."
            );

        }



        // ==================================
        // AUTH FAILED
        // ==================================

        if (
            response.status === 401 ||
            response.status === 403
        ) {

            clearOrganisationLogin();

            window.location.replace(
                "login.html"
            );

            return;

        }



        if (!response.ok) {

            console.error(
                "Unable to load campaigns:",
                data.message
            );


            displayCampaignError();

            return;

        }



        const campaigns =
            Array.isArray(
                data.campaigns
            )
                ? data.campaigns
                : [];


        console.log(
            "Organisation campaigns:",
            campaigns
        );


        displayOrganisationCampaigns(
            campaigns
        );


        displayOverviewCampaigns(
            campaigns
        );


        updateCampaignStatistics(
            campaigns
        );


    } catch (error) {

        console.error(
            "Load Campaigns Error:",
            error
        );


        displayCampaignError();

    }

}



// ==========================================
// DISPLAY CAMPAIGNS
// ==========================================

function displayOrganisationCampaigns(
    campaigns
) {

    const container =
        document.getElementById(
            "organisationCampaignList"
        );


    if (!container) {

        return;

    }



    // ==================================
    // EMPTY
    // ==================================

    if (
        !campaigns ||
        campaigns.length === 0
    ) {

        container.innerHTML = `

            <div class="empty-state">

                <i class="fa-solid fa-bullhorn"></i>

                <h3>
                    No campaigns yet
                </h3>

                <p>
                    Create your first KindLink campaign
                    to start raising support.
                </p>

            </div>

        `;


        return;

    }



    // ==================================
    // CAMPAIGN CARDS
    // ==================================

    container.innerHTML =
        campaigns
            .map(
                function (campaign) {

                    const goal =
                        Number(
                            campaign.goalAmount
                        ) || 0;


                    const raised =
                        Number(
                            campaign.amountRaised
                        ) || 0;


                    let percentage = 0;


                    if (goal > 0) {

                        percentage =
                            Math.round(
                                (
                                    raised /
                                    goal
                                ) * 100
                            );

                    }


                    percentage =
                        Math.min(
                            Math.max(
                                percentage,
                                0
                            ),
                            100
                        );


                    const status =
                        campaign.status ||
                        "active";


                    const city =
                        campaign.location?.city ||
                        campaign.city ||
                        "";


                    const state =
                        campaign.location?.state ||
                        campaign.state ||
                        "";


                    let locationText = "";


                    if (city && state) {

                        locationText =
                            `${city}, ${state}`;

                    } else {

                        locationText =
                            city ||
                            state;

                    }



                    return `

                        <article class="management-card">

                            <div class="management-top">

                                <span class="category-tag">

                                    ${escapeHTML(
                                        campaign.category ||
                                        "Other"
                                    )}

                                </span>


                                <span
                                    class="status ${escapeHTML(
                                        status
                                    )}"
                                >

                                    ${escapeHTML(
                                        formatStatus(
                                            status
                                        )
                                    )}

                                </span>

                            </div>


                            <h3>

                                ${escapeHTML(
                                    campaign.title ||
                                    "Untitled Campaign"
                                )}

                            </h3>


                            <p>

                                ${escapeHTML(
                                    campaign.description ||
                                    ""
                                )}

                            </p>


                            ${
                                locationText
                                    ? `

                                    <div class="info-list">

                                        <p>

                                            <i class="fa-solid fa-location-dot"></i>

                                            ${escapeHTML(
                                                locationText
                                            )}

                                        </p>

                                    </div>

                                    `
                                    : ""
                            }


                            <div class="progress">

                                <span
                                    style="width:${percentage}%"
                                ></span>

                            </div>


                            <div class="campaign-meta">

                                <span>

                                    ₹${raised.toLocaleString(
                                        "en-IN"
                                    )}
                                    raised of
                                    ₹${goal.toLocaleString(
                                        "en-IN"
                                    )}

                                </span>


                                <strong>

                                    ${percentage}%

                                </strong>

                            </div>


                            <div class="management-actions">

                                <button
                                    type="button"
                                    class="campaign-edit-btn"
                                    data-id="${escapeHTML(
                                        campaign._id
                                    )}"
                                >

                                    <i class="fa-solid fa-pen"></i>

                                    Edit

                                </button>


                                <button
                                    type="button"
                                    class="campaign-analytics-btn"
                                    data-id="${escapeHTML(
                                        campaign._id
                                    )}"
                                >

                                    <i class="fa-solid fa-chart-line"></i>

                                    Analytics

                                </button>

                            </div>

                        </article>

                    `;

                }
            )
            .join("");

}



// ==========================================
// OVERVIEW CAMPAIGNS
// ==========================================

function displayOverviewCampaigns(
    campaigns
) {

    const container =
        document.getElementById(
            "overviewCampaignList"
        );


    if (!container) {

        return;

    }


    if (
        !campaigns ||
        campaigns.length === 0
    ) {

        container.innerHTML = `

            <p>
                Create your first campaign to
                see campaign performance here.
            </p>

        `;


        return;

    }



    const latestCampaigns =
        campaigns.slice(
            0,
            2
        );



    container.innerHTML =
        latestCampaigns
            .map(
                function (campaign) {

                    const goal =
                        Number(
                            campaign.goalAmount
                        ) || 0;


                    const raised =
                        Number(
                            campaign.amountRaised
                        ) || 0;


                    let percentage = 0;


                    if (goal > 0) {

                        percentage =
                            Math.round(
                                raised /
                                goal *
                                100
                            );

                    }


                    percentage =
                        Math.min(
                            percentage,
                            100
                        );


                    return `

                        <article class="performance-item">

                            <div>

                                <span class="category-tag">

                                    ${escapeHTML(
                                        campaign.category ||
                                        "Other"
                                    )}

                                </span>


                                <h3>

                                    ${escapeHTML(
                                        campaign.title
                                    )}

                                </h3>


                                <p>

                                    ₹${raised.toLocaleString(
                                        "en-IN"
                                    )}
                                    of
                                    ₹${goal.toLocaleString(
                                        "en-IN"
                                    )}

                                </p>

                            </div>


                            <div class="progress-area">

                                <div class="progress">

                                    <span
                                        style="width:${percentage}%"
                                    ></span>

                                </div>


                                <strong>

                                    ${percentage}%

                                </strong>

                            </div>

                        </article>

                    `;

                }
            )
            .join("");

}



// ==========================================
// CAMPAIGN STATISTICS
// ==========================================

function updateCampaignStatistics(
    campaigns
) {

    const activeCampaigns =
        campaigns.filter(
            function (campaign) {

                return (
                    campaign.status ||
                    "active"
                ) === "active";

            }
        );


    const totalRaised =
        campaigns.reduce(
            function (
                total,
                campaign
            ) {

                return (
                    total +
                    (
                        Number(
                            campaign.amountRaised
                        ) ||
                        0
                    )
                );

            },
            0
        );



    setText(
        "activeCampaignCount",
        activeCampaigns.length
    );


    setText(
        "totalFundsRaised",
        `₹${totalRaised.toLocaleString(
            "en-IN"
        )}`
    );

}



// ==========================================
// CAMPAIGN ERROR
// ==========================================

function displayCampaignError() {

    const container =
        document.getElementById(
            "organisationCampaignList"
        );


    if (!container) {

        return;

    }


    container.innerHTML = `

        <div class="empty-state">

            <i class="fa-solid fa-circle-exclamation"></i>

            <h3>
                Unable to load campaigns
            </h3>

            <p>
                Make sure the KindLink backend server
                is running on port 5000.
            </p>

        </div>

    `;

}



// ==========================================
// ESCAPE HTML
// ==========================================

function escapeHTML(value) {

    if (
        value === undefined ||
        value === null
    ) {

        return "";

    }


    return String(value)

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


                const target =
                    document.getElementById(
                        tab.dataset.tab
                    );


                if (target) {

                    target.classList.add(
                        "active"
                    );

                }

            }
        );

    }
);



// ==========================================
// DEMO FORMS
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


                if (modal) {

                    modal.classList.remove(
                        "show"
                    );

                }


                form.reset();


                showToast(
                    "This feature will be connected in its backend phase."
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


if (profileForm) {

    profileForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            if (profileMessage) {

                profileMessage.textContent =
                    "Profile editing backend will be connected later.";

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
// STORY BUTTON
// ==========================================

const newStoryBtn =
    document.getElementById(
        "newStoryBtn"
    );


if (newStoryBtn) {

    newStoryBtn.addEventListener(
        "click",
        function () {

            showToast(
                "Story publishing will be connected in Phase 3.14."
            );

        }
    );

}



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


let toastTimer;


function showToast(message) {

    if (
        !toast ||
        !toastMessage
    ) {

        return;

    }


    toastMessage.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
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



// Open logout modal

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function () {

            if (logoutModal) {

                logoutModal.classList.add(
                    "show"
                );

            }

        }
    );

}



// Cancel logout

if (cancelLogout) {

    cancelLogout.addEventListener(
        "click",
        function () {

            if (logoutModal) {

                logoutModal.classList.remove(
                    "show"
                );

            }

        }
    );

}



// Confirm logout

if (confirmLogout) {

    confirmLogout.addEventListener(
        "click",
        function () {

            clearOrganisationLogin();


            window.location.replace(
                "login.html"
            );

        }
    );

}



// Outside logout modal click

if (logoutModal) {

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

}



// ==========================================
// INITIAL DASHBOARD LOAD
// ==========================================

async function initialiseDashboard() {

    await verifyOrganisation();

    await loadOrganisationCampaigns();

}


initialiseDashboard();