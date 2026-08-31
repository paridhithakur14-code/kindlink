/* =========================================
   KINDLINK - CAUSES PAGE
========================================= */


const API_URL =
    "http://localhost:5000";


const searchInput =
    document.getElementById(
        "causeSearch"
    );


const categoryButtons =
    document.querySelectorAll(
        ".category-btn"
    );


const campaignGrid =
    document.getElementById(
        "campaignGrid"
    );


const resultCount =
    document.getElementById(
        "resultCount"
    );


const noResults =
    document.getElementById(
        "noResults"
    );


const sortSelect =
    document.getElementById(
        "sortCauses"
    );


let selectedCategory =
    "all";


let campaigns =
    [];


let selectedCampaignId =
    null;


let selectedCampaignName =
    "";


// =========================================
// LOAD CAMPAIGNS FROM MONGODB
// =========================================

async function loadCampaigns() {

    if (!campaignGrid) {

        return;

    }


    campaignGrid.innerHTML = `

        <div
            style="
                grid-column: 1 / -1;
                text-align:center;
                padding:50px;
            "
        >
            Loading campaigns...
        </div>

    `;


    try {

        const response =
            await fetch(

                `${API_URL}/api/campaigns`

            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Unable to load campaigns"
            );

        }


        campaigns =
            Array.isArray(
                data.campaigns
            )
                ? data.campaigns
                : [];


        renderCampaigns();


    } catch (error) {

        console.error(
            "Campaign Load Error:",
            error
        );


        campaignGrid.innerHTML = `

            <div
                style="
                    grid-column:1 / -1;
                    text-align:center;
                    padding:50px;
                "
            >

                <h3>
                    Unable to load campaigns
                </h3>

                <p>
                    Make sure the KindLink backend
                    is running on port 5000.
                </p>

            </div>

        `;

    }

}


// =========================================
// RENDER CAMPAIGNS
// =========================================

function renderCampaigns() {

    let filteredCampaigns =
        [...campaigns];


    // =====================================
    // SEARCH
    // =====================================

    const searchText =
        searchInput
            ? searchInput
                .value
                .trim()
                .toLowerCase()
            : "";


    if (searchText) {

        filteredCampaigns =
            filteredCampaigns.filter(
                campaign => {

                    const title =
                        campaign.title ||
                        "";


                    const description =
                        campaign.description ||
                        "";


                    const organisation =
                        campaign
                            .organisation
                            ?.organisationName ||
                        "";


                    return (

                        title
                            .toLowerCase()
                            .includes(
                                searchText
                            ) ||

                        description
                            .toLowerCase()
                            .includes(
                                searchText
                            ) ||

                        organisation
                            .toLowerCase()
                            .includes(
                                searchText
                            )

                    );

                }
            );

    }


    // =====================================
    // CATEGORY FILTER
    // =====================================

    if (
        selectedCategory !==
        "all"
    ) {

        filteredCampaigns =
            filteredCampaigns.filter(
                campaign => {

                    return (
                        normalizeCategory(
                            campaign.category
                        ) ===
                        selectedCategory
                    );

                }
            );

    }


    // =====================================
    // SORT
    // =====================================

    if (
        sortSelect &&
        sortSelect.value ===
        "progress"
    ) {

        filteredCampaigns.sort(
            (a, b) => {

                return (
                    getPercentage(b) -
                    getPercentage(a)
                );

            }
        );

    }


    if (
        sortSelect &&
        sortSelect.value ===
        "urgent"
    ) {

        filteredCampaigns.sort(
            (a, b) => {

                const aEnd =
                    a.endDate
                        ? new Date(
                            a.endDate
                        ).getTime()
                        : Infinity;


                const bEnd =
                    b.endDate
                        ? new Date(
                            b.endDate
                        ).getTime()
                        : Infinity;


                return (
                    aEnd -
                    bEnd
                );

            }
        );

    }


    // =====================================
    // COUNT
    // =====================================

    if (resultCount) {

        resultCount.textContent =
            `${filteredCampaigns.length} campaign${
                filteredCampaigns.length === 1
                    ? ""
                    : "s"
            }`;

    }


    // =====================================
    // EMPTY STATE
    // =====================================

    if (
        filteredCampaigns.length === 0
    ) {

        campaignGrid.innerHTML =
            "";


        if (noResults) {

            noResults.classList.add(
                "show"
            );

        }


        return;

    }


    if (noResults) {

        noResults.classList.remove(
            "show"
        );

    }


    // =====================================
    // CREATE CARDS
    // =====================================

    campaignGrid.innerHTML =
        filteredCampaigns
            .map(
                campaign =>
                    createCampaignCard(
                        campaign
                    )
            )
            .join("");

}


// =========================================
// CREATE CAMPAIGN CARD
// =========================================

function createCampaignCard(
    campaign
) {

    const goal =
        Number(
            campaign.goalAmount
        ) || 0;


    const raised =
        Number(
            campaign.amountRaised
        ) || 0;


    const percentage =
        getPercentage(
            campaign
        );


    const organisationName =
        campaign
            .organisation
            ?.organisationName ||
        "KindLink Organisation";


    const city =
        campaign
            .location
            ?.city ||
        "";


    const state =
        campaign
            .location
            ?.state ||
        "";


    let locationText =
        "Location not provided";


    if (
        city &&
        state
    ) {

        locationText =
            `${city}, ${state}`;

    } else if (city) {

        locationText =
            city;

    } else if (state) {

        locationText =
            state;

    }


    return `

        <article
            class="campaign-card"
            data-category="${escapeHTML(
                normalizeCategory(
                    campaign.category
                )
            )}"
            data-title="${escapeHTML(
                campaign.title
            )}"
            data-progress="${percentage}"
        >

            <div class="campaign-top">

                <div class="campaign-emoji">

                    ${getCategoryEmoji(
                        campaign.category
                    )}

                </div>

            </div>


            <div class="campaign-content">

                <span
                    style="
                        font-size:11px;
                        font-weight:700;
                        color:#e88935;
                    "
                >

                    ${escapeHTML(
                        campaign.category ||
                        "Other"
                    )}

                </span>


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


                <div class="campaign-meta">

                    <span>

                        📍 ${escapeHTML(
                            locationText
                        )}

                    </span>

                    <span>

                        🏢 ${escapeHTML(
                            organisationName
                        )}

                    </span>

                </div>


                <div class="progress-info">

                    <span>

                        ₹${raised.toLocaleString(
                            "en-IN"
                        )} raised

                    </span>


                    <strong>

                        ${percentage}%

                    </strong>

                </div>


                <div class="progress-bar">

                    <div
                        style="width:${percentage}%"
                    ></div>

                </div>


                <div class="campaign-bottom">

                    <span>

                        Goal:
                        ₹${goal.toLocaleString(
                            "en-IN"
                        )}

                    </span>


                    <button
                        type="button"
                        class="support-btn"
                        onclick="openDonation(
                            '${escapeAttribute(
                                campaign._id
                            )}',
                            '${escapeAttribute(
                                campaign.title
                            )}'
                        )"
                    >

                        Support →

                    </button>

                </div>

            </div>

        </article>

    `;

}


// =========================================
// CATEGORY NORMALIZATION
// =========================================

function normalizeCategory(
    category
) {

    const value =
        String(
            category || ""
        )
            .trim()
            .toLowerCase();


    const map = {

        "education":
            "education",

        "healthcare":
            "health",

        "environment":
            "environment",

        "animals":
            "animals",

        "community":
            "community",

        "women empowerment":
            "women",

        "child welfare":
            "children",

        "disaster relief":
            "emergency",

        "other":
            "other"

    };


    return (
        map[value] ||
        value
    );

}


// =========================================
// CATEGORY EMOJI
// =========================================

function getCategoryEmoji(
    category
) {

    const emojis = {

        Education:
            "📚",

        Healthcare:
            "🏥",

        Environment:
            "🌱",

        Animals:
            "🐾",

        Community:
            "🤝",

        "Women Empowerment":
            "👩",

        "Child Welfare":
            "🧒",

        "Disaster Relief":
            "🚨",

        Other:
            "❤️"

    };


    return (
        emojis[category] ||
        "❤️"
    );

}


// =========================================
// GET PROGRESS
// =========================================

function getPercentage(
    campaign
) {

    const goal =
        Number(
            campaign.goalAmount
        ) || 0;


    const raised =
        Number(
            campaign.amountRaised
        ) || 0;


    if (goal <= 0) {

        return 0;

    }


    return Math.min(

        100,

        Math.max(

            0,

            Math.round(
                raised /
                goal *
                100
            )

        )

    );

}


// =========================================
// FILTER EVENTS
// =========================================

categoryButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                categoryButtons.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                selectedCategory =
                    button.dataset.category;


                renderCampaigns();

            }
        );

    }
);


if (searchInput) {

    searchInput.addEventListener(
        "input",
        renderCampaigns
    );

}


if (sortSelect) {

    sortSelect.addEventListener(
        "change",
        renderCampaigns
    );

}


// =========================================
// DONATION MODAL
// =========================================

const donationModal =
    document.getElementById(
        "donationModal"
    );


const donationCause =
    document.getElementById(
        "donationCause"
    );


const customAmount =
    document.getElementById(
        "customAmount"
    );


// =========================================
// OPEN DONATION MODAL
// =========================================

function openDonation(
    campaignId,
    campaignName
) {

    selectedCampaignId =
        campaignId;


    selectedCampaignName =
        campaignName;


    if (donationCause) {

        donationCause.textContent =
            campaignName;

    }


    if (customAmount) {

        customAmount.value =
            "";

    }


    if (donationModal) {

        donationModal.classList.add(
            "show"
        );

    }


    document.body.style.overflow =
        "hidden";

}


// =========================================
// CLOSE DONATION MODAL
// =========================================

function closeDonation() {

    if (donationModal) {

        donationModal.classList.remove(
            "show"
        );

    }


    document.body.style.overflow =
        "";


    selectedCampaignId =
        null;


    selectedCampaignName =
        "";

}


// =========================================
// SELECT DONATION AMOUNT
// =========================================

function selectAmount(
    amount
) {

    if (customAmount) {

        customAmount.value =
            amount;

    }

}


// =========================================
// PROCESS REAL DONATION
// =========================================

async function processDonation() {

    const amount =
        Number(
            customAmount?.value
        );


    if (
        !amount ||
        amount <= 0
    ) {

        alert(
            "Please enter a valid donation amount."
        );

        return;

    }


    if (!selectedCampaignId) {

        alert(
            "Campaign could not be identified."
        );

        return;

    }


    // =====================================
    // USER AUTHENTICATION
    // =====================================

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

        alert(
            "Please login as a user to make a donation."
        );


        window.location.href =
            "login.html";


        return;

    }


    const donateButton =
        document.querySelector(
            ".modal-donate"
        );


    if (donateButton) {

        donateButton.disabled =
            true;


        donateButton.textContent =
            "Processing...";

    }


    try {

        const response =
            await fetch(

                `${API_URL}/api/donations`,

                {

                    method:
                        "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`

                    },

                    body:
                        JSON.stringify({

                            campaignId:
                                selectedCampaignId,

                            amount

                        })

                }

            );


        const data =
            await response.json();


        if (
            response.status === 401 ||
            response.status === 403
        ) {

            localStorage.removeItem(
                "kindlinkToken"
            );


            localStorage.removeItem(
                "kindlinkUser"
            );


            localStorage.removeItem(
                "kindlinkAccountType"
            );


            alert(
                "Your login has expired. Please login again."
            );


            window.location.href =
                "login.html";


            return;

        }


        if (!response.ok) {

            alert(
                data.message ||
                "Unable to process donation."
            );

            return;

        }


        alert(

            `Thank you! Your donation of ₹${amount.toLocaleString(
                "en-IN"
            )} to "${selectedCampaignName}" was recorded successfully.`

        );


        closeDonation();


        // Reload campaigns so
        // amountRaised changes immediately

        await loadCampaigns();


    } catch (error) {

        console.error(
            "Donation Error:",
            error
        );


        alert(
            "Unable to connect to the KindLink server."
        );

    } finally {

        if (donateButton) {

            donateButton.disabled =
                false;


            donateButton.textContent =
                "Continue Donation →";

        }

    }

}


// =========================================
// CLOSE ON BACKGROUND
// =========================================

if (donationModal) {

    donationModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                donationModal
            ) {

                closeDonation();

            }

        }
    );

}


// =========================================
// ESCAPE KEY
// =========================================

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Escape"
        ) {

            closeDonation();

        }

    }
);


// =========================================
// ESCAPE HTML
// =========================================

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


// =========================================
// ESCAPE JS ATTRIBUTE VALUE
// =========================================

function escapeAttribute(
    value
) {

    return String(
        value ?? ""
    )

        .replaceAll(
            "\\",
            "\\\\"
        )

        .replaceAll(
            "'",
            "\\'"
        )

        .replaceAll(
            "\n",
            " "
        )

        .replaceAll(
            "\r",
            " "
        );

}


// =========================================
// INITIAL LOAD
// =========================================

loadCampaigns();