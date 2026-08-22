/* =========================================
   KINDLINK - CAUSES PAGE
   PHASE 3.10
   MongoDB Campaign Integration
========================================= */


/* =========================================
   API
========================================= */

const CAMPAIGN_API =
    "http://localhost:5000/api/campaigns";



/* =========================================
   DOM ELEMENTS
========================================= */

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


const campaignLoading =
    document.getElementById(
        "campaignLoading"
    );


const campaignError =
    document.getElementById(
        "campaignError"
    );


const campaignErrorMessage =
    document.getElementById(
        "campaignErrorMessage"
    );


const retryCampaignsButton =
    document.getElementById(
        "retryCampaigns"
    );



/* =========================================
   DONATION ELEMENTS
========================================= */

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



/* =========================================
   STATE
========================================= */

let allCampaigns = [];

let selectedCategory =
    "all";

let selectedCampaign =
    null;



/* =========================================
   CATEGORY SETTINGS
========================================= */

const categorySettings = {

    Education: {

        emoji: "📚",

        label:
            "Education",

        imageClass:
            "education-image"

    },


    Healthcare: {

        emoji: "🏥",

        label:
            "Healthcare",

        imageClass:
            "health-image"

    },


    Animals: {

        emoji: "🐾",

        label:
            "Animal Welfare",

        imageClass:
            "animal-image"

    },


    Environment: {

        emoji: "🌱",

        label:
            "Environment",

        imageClass:
            "environment-image"

    },


    Community: {

        emoji: "🤝",

        label:
            "Community",

        imageClass:
            "community-image"

    },


    "Women Empowerment": {

        emoji: "👩",

        label:
            "Women Empowerment",

        imageClass:
            "women-image"

    },


    "Child Welfare": {

        emoji: "🧒",

        label:
            "Child Welfare",

        imageClass:
            "child-image"

    },


    "Disaster Relief": {

        emoji: "🚨",

        label:
            "Disaster Relief",

        imageClass:
            "disaster-image"

    },


    Other: {

        emoji: "💚",

        label:
            "Other",

        imageClass:
            "other-image"

    }

};



/* =========================================
   ESCAPE HTML
   Prevent unwanted HTML injection
========================================= */

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
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



/* =========================================
   FORMAT MONEY
========================================= */

function formatMoney(amount) {

    const number =
        Number(amount) || 0;


    return new Intl.NumberFormat(
        "en-IN",
        {

            maximumFractionDigits: 0

        }

    ).format(number);

}



/* =========================================
   CALCULATE CAMPAIGN PROGRESS
========================================= */

function getCampaignProgress(
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


    const progress =
        (raised / goal) * 100;


    return Math.min(
        Math.max(
            Math.round(progress),
            0
        ),
        100
    );

}



/* =========================================
   FORMAT LOCATION
========================================= */

function getCampaignLocation(
    campaign
) {

    const city =
        campaign.location?.city
            ?.trim();


    const state =
        campaign.location?.state
            ?.trim();


    if (
        city &&
        state
    ) {

        return `${city}, ${state}`;

    }


    if (city) {

        return city;

    }


    if (state) {

        return state;

    }


    return "Location not specified";

}



/* =========================================
   GET ORGANISATION NAME
========================================= */

function getOrganisationName(
    campaign
) {

    if (
        campaign.organisation &&
        typeof campaign.organisation
            === "object"
    ) {

        return (
            campaign
                .organisation
                .organisationName
            ||
            "KindLink Organisation"
        );

    }


    return "KindLink Organisation";

}



/* =========================================
   FORMAT DATE
========================================= */

function formatCampaignDate(
    dateValue
) {

    if (!dateValue) {

        return "";

    }


    const date =
        new Date(dateValue);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "";

    }


    return date.toLocaleDateString(
        "en-IN",
        {

            day: "numeric",

            month: "short",

            year: "numeric"

        }
    );

}



/* =========================================
   CREATE CAMPAIGN CARD
========================================= */

function createCampaignCard(
    campaign
) {

    const category =
        categorySettings[
            campaign.category
        ]
        ||
        categorySettings.Other;


    const progress =
        getCampaignProgress(
            campaign
        );


    const amountRaised =
        Number(
            campaign.amountRaised
        ) || 0;


    const goalAmount =
        Number(
            campaign.goalAmount
        ) || 0;


    const organisationName =
        getOrganisationName(
            campaign
        );


    const location =
        getCampaignLocation(
            campaign
        );


    const endDate =
        formatCampaignDate(
            campaign.endDate
        );


    const safeTitle =
        escapeHTML(
            campaign.title
        );


    const safeDescription =
        escapeHTML(
            campaign.description
        );


    const safeOrganisation =
        escapeHTML(
            organisationName
        );


    const safeLocation =
        escapeHTML(
            location
        );


    let imageContent = "";


    let imageExtraClass = "";


    if (
        campaign.image &&
        String(
            campaign.image
        ).trim()
    ) {

        imageExtraClass =
            "has-image";


        imageContent = `

            <img
                src="${escapeHTML(
                    campaign.image
                )}"
                alt="${safeTitle}"
                loading="lazy"
                onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
            >

            <div
                class="campaign-emoji"
                style="display:none;"
            >
                ${category.emoji}
            </div>

        `;

    } else {

        imageContent = `

            <div class="campaign-emoji">
                ${category.emoji}
            </div>

        `;

    }



    return `

        <article
            class="campaign-card"
            data-id="${escapeHTML(
                campaign._id
            )}"
        >


            <div
                class="
                    campaign-image
                    ${category.imageClass}
                    ${imageExtraClass}
                "
            >


                <span class="campaign-category">

                    ${category.emoji}
                    ${escapeHTML(
                        category.label
                    )}

                </span>


                <span class="campaign-status">
                    Active
                </span>


                ${imageContent}


            </div>



            <div class="campaign-content">


                <h3>
                    ${safeTitle}
                </h3>


                <p class="campaign-description">
                    ${safeDescription}
                </p>



                <div class="campaign-organisation">

                    <span class="organisation-icon">
                        🏢
                    </span>

                    <span>
                        ${safeOrganisation}
                    </span>

                </div>



                <div class="campaign-meta">

                    <span
                        title="${safeLocation}"
                    >

                        📍 ${safeLocation}

                    </span>


                    <span>

                        ${
                            endDate
                            ?
                            `📅 Until ${escapeHTML(
                                endDate
                            )}`
                            :
                            "📅 Ongoing"
                        }

                    </span>

                </div>



                <div class="progress-info">

                    <span>

                        ₹${formatMoney(
                            amountRaised
                        )}
                        raised

                    </span>


                    <strong>
                        ${progress}%
                    </strong>

                </div>



                <div class="progress-bar">

                    <div
                        style="
                            width:${progress}%
                        "
                    >
                    </div>

                </div>



                <div class="campaign-bottom">

                    <span>

                        Goal:
                        ₹${formatMoney(
                            goalAmount
                        )}

                    </span>


                    <button
                        class="support-btn"
                        type="button"
                        data-campaign-id="${escapeHTML(
                            campaign._id
                        )}"
                    >

                        Support →

                    </button>

                </div>


            </div>


        </article>

    `;

}



/* =========================================
   DISPLAY CAMPAIGNS
========================================= */

function renderCampaigns(
    campaigns
) {

    campaignGrid.innerHTML =
        campaigns
            .map(
                createCampaignCard
            )
            .join("");


    resultCount.textContent =
        `${campaigns.length} campaign${
            campaigns.length !== 1
                ? "s"
                : ""
        }`;


    if (
        campaigns.length === 0
    ) {

        noResults.classList.add(
            "show"
        );

    } else {

        noResults.classList.remove(
            "show"
        );

    }

}



/* =========================================
   FILTER + SORT CAMPAIGNS
========================================= */

function filterAndSortCampaigns() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    let campaigns =
        [...allCampaigns];



    /* =====================================
       CATEGORY FILTER
    ====================================== */

    if (
        selectedCategory !== "all"
    ) {

        campaigns =
            campaigns.filter(
                campaign =>

                    campaign.category
                    === selectedCategory

            );

    }



    /* =====================================
       SEARCH FILTER
    ====================================== */

    if (searchText) {

        campaigns =
            campaigns.filter(
                campaign => {


                    const title =
                        campaign.title
                            || "";


                    const description =
                        campaign.description
                            || "";


                    const category =
                        campaign.category
                            || "";


                    const organisation =
                        getOrganisationName(
                            campaign
                        );


                    const location =
                        getCampaignLocation(
                            campaign
                        );


                    const searchableText =
                        `

                            ${title}

                            ${description}

                            ${category}

                            ${organisation}

                            ${location}

                        `
                        .toLowerCase();


                    return searchableText
                        .includes(
                            searchText
                        );

                }
            );

    }



    /* =====================================
       SORT
    ====================================== */

    const sortValue =
        sortSelect.value;



    if (
        sortValue === "progress"
    ) {

        campaigns.sort(
            (a, b) =>

                getCampaignProgress(b)
                -
                getCampaignProgress(a)

        );

    }



    else if (
        sortValue === "goal"
    ) {

        campaigns.sort(
            (a, b) =>

                Number(
                    b.goalAmount
                )
                -
                Number(
                    a.goalAmount
                )

        );

    }



    else {

        campaigns.sort(
            (a, b) => {

                const dateA =
                    new Date(
                        a.createdAt
                    ).getTime();


                const dateB =
                    new Date(
                        b.createdAt
                    ).getTime();


                return (
                    dateB - dateA
                );

            }
        );

    }



    renderCampaigns(
        campaigns
    );

}



/* =========================================
   LOAD CAMPAIGNS FROM BACKEND
========================================= */

async function loadCampaigns() {


    /* Reset states */

    campaignLoading
        .classList
        .remove(
            "hide"
        );


    campaignError
        .classList
        .remove(
            "show"
        );


    noResults
        .classList
        .remove(
            "show"
        );


    campaignGrid.innerHTML =
        "";


    resultCount.textContent =
        "Loading campaigns...";


    try {


        const response =
            await fetch(
                CAMPAIGN_API,
                {

                    method:
                        "GET",

                    headers: {

                        "Content-Type":
                            "application/json"

                    }

                }
            );


        const data =
            await response.json();



        if (
            !response.ok
        ) {

            throw new Error(

                data.message
                ||
                "Failed to load campaigns"

            );

        }



        if (
            !data.success
        ) {

            throw new Error(

                data.message
                ||
                "Unable to load campaigns"

            );

        }



        allCampaigns =
            Array.isArray(
                data.campaigns
            )
                ?
                data.campaigns
                :
                [];



        campaignLoading
            .classList
            .add(
                "hide"
            );



        filterAndSortCampaigns();


    } catch (error) {


        console.error(
            "Load Campaigns Error:",
            error
        );


        allCampaigns = [];


        campaignLoading
            .classList
            .add(
                "hide"
            );


        campaignGrid.innerHTML =
            "";


        resultCount.textContent =
            "0 campaigns";


        campaignErrorMessage.textContent =
            error.message
            ||
            "Please make sure the KindLink server is running.";


        campaignError
            .classList
            .add(
                "show"
            );

    }

}



/* =========================================
   CATEGORY BUTTONS
========================================= */

categoryButtons.forEach(
    button => {


        button.addEventListener(
            "click",
            () => {


                categoryButtons
                    .forEach(
                        btn => {

                            btn.classList
                                .remove(
                                    "active"
                                );

                        }
                    );


                button.classList
                    .add(
                        "active"
                    );


                selectedCategory =
                    button.dataset
                        .category;


                filterAndSortCampaigns();

            }
        );

    }
);



/* =========================================
   SEARCH
========================================= */

searchInput.addEventListener(
    "input",
    () => {

        filterAndSortCampaigns();

    }
);



/* =========================================
   SORT
========================================= */

sortSelect.addEventListener(
    "change",
    () => {

        filterAndSortCampaigns();

    }
);



/* =========================================
   RETRY
========================================= */

retryCampaignsButton.addEventListener(
    "click",
    () => {

        loadCampaigns();

    }
);



/* =========================================
   SUPPORT BUTTONS
   Event Delegation
========================================= */

campaignGrid.addEventListener(
    "click",
    event => {


        const supportButton =
            event.target.closest(
                ".support-btn"
            );


        if (!supportButton) {

            return;

        }


        const campaignId =
            supportButton.dataset
                .campaignId;


        const campaign =
            allCampaigns.find(
                item =>

                    item._id
                    === campaignId

            );


        if (!campaign) {

            alert(
                "Campaign information could not be found."
            );

            return;

        }


        openDonation(
            campaign
        );

    }
);



/* =========================================
   OPEN DONATION MODAL
========================================= */

function openDonation(
    campaign
) {


    selectedCampaign =
        campaign;


    donationCause.textContent =
        campaign.title
        ||
        "Selected Campaign";


    customAmount.value =
        "";


    donationModal
        .classList
        .add(
            "show"
        );


    document.body.style.overflow =
        "hidden";

}



/* =========================================
   CLOSE DONATION MODAL
========================================= */

function closeDonation() {


    donationModal
        .classList
        .remove(
            "show"
        );


    document.body.style.overflow =
        "";


    selectedCampaign =
        null;

}



/* =========================================
   SELECT DONATION AMOUNT
========================================= */

function selectAmount(
    amount
) {

    customAmount.value =
        amount;

}



/* =========================================
   PROCESS DONATION
   Prototype for Phase 3.10
========================================= */

function processDonation() {


    const amount =
        Number(
            customAmount.value
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



    if (
        !selectedCampaign
    ) {

        alert(
            "Please select a campaign first."
        );

        return;

    }



    alert(

        `Thank you!

Your donation of ₹${formatMoney(amount)}
for "${selectedCampaign.title}"
is ready to be processed.

Real donation storage will be connected in the next backend phase.`

    );


    closeDonation();

}



/* =========================================
   CLOSE MODAL ON BACKGROUND CLICK
========================================= */

donationModal.addEventListener(
    "click",
    event => {


        if (
            event.target
            === donationModal
        ) {

            closeDonation();

        }

    }
);



/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener(
    "keydown",
    event => {


        if (
            event.key
            === "Escape"
        ) {

            closeDonation();

        }

    }
);



/* =========================================
   LOAD CAMPAIGNS WHEN PAGE OPENS
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadCampaigns();

    }
);