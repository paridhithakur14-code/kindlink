// ==========================================
// KINDLINK PUBLIC VOLUNTEER PAGE
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        // ======================================
        // API
        // ======================================

        const API_URL =
            "http://localhost:5000";


        // ======================================
        // ELEMENTS
        // ======================================

        const searchInput =
            document.getElementById(
                "volunteerSearch"
            );


        const locationFilter =
            document.getElementById(
                "locationFilter"
            );


        const filterButtons =
            document.querySelectorAll(
                ".volunteer-filter"
            );


        const grid =
            document.getElementById(
                "opportunitiesGrid"
            );


        const count =
            document.getElementById(
                "opportunityCount"
            );


        const noResults =
            document.getElementById(
                "noVolunteerResults"
            );


        let opportunities =
            [];


        let selectedCategory =
            "all";



        // ======================================
        // CATEGORY INFORMATION
        // ======================================

        const categoryInformation = {

            education: {

                label:
                    "Education",

                icon:
                    "📚",

                background:
                    "education-bg"

            },

            animals: {

                label:
                    "Animal Welfare",

                icon:
                    "🐶",

                background:
                    "animal-bg"

            },

            environment: {

                label:
                    "Environment",

                icon:
                    "🌳",

                background:
                    "environment-bg"

            },

            community: {

                label:
                    "Community",

                icon:
                    "🍱",

                background:
                    "community-bg"

            },

            emergency: {

                label:
                    "Emergency",

                icon:
                    "🚨",

                background:
                    "emergency-bg"

            },

            other: {

                label:
                    "Other",

                icon:
                    "🤝",

                background:
                    "online-bg"

            }

        };



        // ======================================
        // LOAD OPPORTUNITIES
        // ======================================

        async function loadVolunteerOpportunities() {

            try {

                const response =
                    await fetch(
                        `${API_URL}/api/volunteers`
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Unable to load volunteer opportunities."
                    );

                }


                opportunities =
                    Array.isArray(
                        data.opportunities
                    )
                        ? data.opportunities
                        : [];


                buildLocationOptions();


                renderOpportunities(
                    opportunities
                );


            } catch (error) {

                console.error(
                    "Volunteer Load Error:",
                    error
                );


                if (grid) {

                    grid.innerHTML = `

                        <div class="no-volunteer-results"
                             style="display:block; grid-column:1/-1;">

                            <div>
                                ⚠️
                            </div>

                            <h3>
                                Unable to load opportunities
                            </h3>

                            <p>
                                Make sure the KindLink server
                                is running on port 5000.
                            </p>

                        </div>

                    `;

                }


                updateOpportunityCount(
                    0
                );

            }

        }



        // ======================================
        // BUILD LOCATION FILTER
        // ======================================

        function buildLocationOptions() {

            if (!locationFilter) {

                return;

            }


            locationFilter.innerHTML = `

                <option value="all">
                    All Locations
                </option>

            `;


            const locations =
                new Map();


            opportunities.forEach(
                function (opportunity) {

                    const mode =
                        opportunity.location?.mode ||
                        "onsite";


                    if (mode === "online") {

                        locations.set(
                            "online",
                            "Online"
                        );

                        return;

                    }


                    const city =
                        opportunity.location?.city
                            ?.trim();


                    if (!city) {

                        return;

                    }


                    locations.set(

                        city.toLowerCase(),

                        city

                    );

                }
            );


            Array
                .from(
                    locations.entries()
                )
                .sort(
                    function (a, b) {

                        return a[1]
                            .localeCompare(
                                b[1]
                            );

                    }
                )
                .forEach(
                    function (
                        [value, label]
                    ) {

                        const option =
                            document.createElement(
                                "option"
                            );


                        option.value =
                            value;


                        option.textContent =
                            label;


                        locationFilter.appendChild(
                            option
                        );

                    }
                );

        }



        // ======================================
        // FILTER
        // ======================================

        function filterOpportunities() {

            const search =
                searchInput
                    ? searchInput
                        .value
                        .toLowerCase()
                        .trim()
                    : "";


            const location =
                locationFilter
                    ? locationFilter.value
                    : "all";


            const filtered =
                opportunities.filter(
                    function (
                        opportunity
                    ) {

                        const organisationName =
                            opportunity.organisation
                                ?.organisationName ||
                            "";


                        const text = [

                            opportunity.title,

                            opportunity.description,

                            opportunity.category,

                            opportunity.location?.city,

                            opportunity.location?.state,

                            opportunity.schedule,

                            organisationName

                        ]
                            .join(" ")
                            .toLowerCase();


                        const categoryMatches =

                            selectedCategory ===
                                "all" ||

                            opportunity.category ===
                                selectedCategory;


                        const mode =
                            opportunity.location?.mode ||
                            "onsite";


                        const city =
                            opportunity.location?.city
                                ?.toLowerCase()
                                .trim() ||
                            "";


                        let locationMatches =
                            location === "all";


                        if (
                            location === "online"
                        ) {

                            locationMatches =
                                mode === "online";

                        } else if (
                            location !== "all"
                        ) {

                            locationMatches =
                                city === location;

                        }


                        return (

                            text.includes(
                                search
                            ) &&

                            categoryMatches &&

                            locationMatches

                        );

                    }
                );


            renderOpportunities(
                filtered
            );

        }



        // ======================================
        // RENDER CARDS
        // ======================================

        function renderOpportunities(
            items
        ) {

            if (!grid) {

                return;

            }


            updateOpportunityCount(
                items.length
            );


            if (
                !items ||
                items.length === 0
            ) {

                grid.innerHTML =
                    "";


                if (noResults) {

                    noResults.style.display =
                        "block";

                }


                return;

            }


            if (noResults) {

                noResults.style.display =
                    "none";

            }


            grid.innerHTML =
                items
                    .map(
                        function (
                            opportunity
                        ) {

                            const category =
                                categoryInformation[
                                    opportunity.category
                                ] ||
                                categoryInformation.other;


                            const mode =
                                opportunity.location
                                    ?.mode ||
                                "onsite";


                            const city =
                                opportunity.location
                                    ?.city ||
                                "";


                            const state =
                                opportunity.location
                                    ?.state ||
                                "";


                            let locationText =
                                "Location not specified";


                            if (
                                mode === "online"
                            ) {

                                locationText =
                                    "Online";

                            } else if (
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


                            const organisationName =
                                opportunity.organisation
                                    ?.organisationName ||
                                "KindLink Organisation";


                            const urgentText =
                                opportunity.isUrgent
                                    ? "⚡ Urgent"
                                    : `🕐 ${
                                        opportunity.schedule ||
                                        "Flexible"
                                    }`;


                            return `

                                <article
                                    class="opportunity-card"
                                    data-category="${escapeHTML(
                                        opportunity.category
                                    )}"
                                    data-location="${escapeHTML(
                                        city.toLowerCase()
                                    )}"
                                >

                                    <div
                                        class="opportunity-icon ${escapeHTML(
                                            category.background
                                        )}"
                                    >

                                        ${category.icon}

                                    </div>


                                    <div class="opportunity-content">

                                        <span class="opportunity-category">

                                            ${escapeHTML(
                                                category.label
                                            )}

                                        </span>


                                        <h3>

                                            ${escapeHTML(
                                                opportunity.title
                                            )}

                                        </h3>


                                        <p>

                                            ${escapeHTML(
                                                opportunity.description
                                            )}

                                        </p>


                                        <p class="opportunity-org">

                                            <strong>
                                                ${escapeHTML(
                                                    organisationName
                                                )}
                                            </strong>

                                        </p>


                                        <div class="opportunity-meta">

                                            <span>

                                                ${
                                                    mode ===
                                                    "online"
                                                        ? "🌐"
                                                        : "📍"
                                                }

                                                ${escapeHTML(
                                                    locationText
                                                )}

                                            </span>


                                            <span>

                                                ${escapeHTML(
                                                    urgentText
                                                )}

                                            </span>


                                            <span>

                                                👥
                                                ${escapeHTML(
                                                    opportunity.slots ||
                                                    1
                                                )}
                                                needed

                                            </span>

                                        </div>


                                        <button
                                            class="apply-btn"
                                            type="button"

                                            data-id="${escapeHTML(
                                                opportunity._id
                                            )}"

                                            data-role="${escapeHTML(
                                                opportunity.title
                                            )}"

                                            data-organization="${escapeHTML(
                                                organisationName
                                            )}"
                                        >

                                            Apply to Volunteer

                                        </button>

                                    </div>

                                </article>

                            `;

                        }
                    )
                    .join("");

        }



        // ======================================
        // COUNT
        // ======================================

        function updateOpportunityCount(
            total
        ) {

            if (!count) {

                return;

            }


            count.textContent =

                `${total} ${
                    total === 1
                        ? "opportunity"
                        : "opportunities"
                }`;

        }



        // ======================================
        // SEARCH
        // ======================================

        if (searchInput) {

            searchInput.addEventListener(
                "input",
                filterOpportunities
            );

        }



        // ======================================
        // LOCATION FILTER
        // ======================================

        if (locationFilter) {

            locationFilter.addEventListener(
                "change",
                filterOpportunities
            );

        }



        // ======================================
        // CATEGORY BUTTONS
        // ======================================

        filterButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        filterButtons.forEach(
                            function (item) {

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


                        filterOpportunities();

                    }
                );

            }
        );



        // ======================================
        // APPLICATION MODAL
        // ======================================

        const modal =
            document.getElementById(
                "volunteerModal"
            );


        const closeModal =
            document.getElementById(
                "closeVolunteerModal"
            );


        const modalRole =
            document.getElementById(
                "modalVolunteerRole"
            );


        const modalOrganization =
            document.getElementById(
                "modalOrganization"
            );


        const form =
            document.getElementById(
                "volunteerForm"
            );


        const success =
            document.getElementById(
                "volunteerSuccess"
            );


        const closeSuccess =
            document.getElementById(
                "closeSuccess"
            );


        let selectedOpportunityId =
            null;



        // ======================================
        // DYNAMIC APPLY BUTTON
        // ======================================

        if (grid) {

            grid.addEventListener(
                "click",
                function (event) {

                    const button =
                        event.target.closest(
                            ".apply-btn"
                        );


                    if (!button) {

                        return;

                    }


                    selectedOpportunityId =
                        button.dataset.id;

// ==================================
// AUTO-FILL LOGGED-IN USER
// ==================================

try {

    const savedUser =
        JSON.parse(
            localStorage.getItem(
                "kindlinkUser"
            )
        );


    if (savedUser) {

        const nameInput =
            document.getElementById(
                "volunteerName"
            );


        const emailInput =
            document.getElementById(
                "volunteerEmail"
            );


        const phoneInput =
            document.getElementById(
                "volunteerPhone"
            );


        if (nameInput) {

            nameInput.value =
                savedUser.name || "";

        }


        if (emailInput) {

            emailInput.value =
                savedUser.email || "";

        }


        if (phoneInput) {

            phoneInput.value =
                savedUser.phone || "";

        }

    }

} catch (error) {

    console.error(
        "Unable to load saved user:",
        error
    );

}                        

                    if (modalRole) {

                        modalRole.textContent =
                            button.dataset.role ||
                            "Apply to Volunteer";

                    }


                    if (modalOrganization) {

                        modalOrganization.textContent =
                            button.dataset.organization ||
                            "KindLink Organisation";

                    }


                    if (form) {

                        form.style.display =
                            "block";

                    }


                    if (success) {

                        success.style.display =
                            "none";

                    }


                    if (modal) {

                        modal.classList.add(
                            "open"
                        );

                    }


                    document.body.style.overflow =
                        "hidden";

                }
            );

        }



        // ======================================
        // CLOSE MODAL
        // ======================================

        function closeVolunteerApplicationModal() {

            if (modal) {

                modal.classList.remove(
                    "open"
                );

            }


            document.body.style.overflow =
                "";


            if (form) {

                form.reset();

            }


            selectedOpportunityId =
                null;

        }



        if (closeModal) {

            closeModal.addEventListener(
                "click",
                closeVolunteerApplicationModal
            );

        }


        if (closeSuccess) {

            closeSuccess.addEventListener(
                "click",
                closeVolunteerApplicationModal
            );

        }


        if (modal) {

            modal.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target ===
                        modal
                    ) {

                        closeVolunteerApplicationModal();

                    }

                }
            );

        }



        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Escape"
                ) {

                    closeVolunteerApplicationModal();

                }

            }
        );



    // ======================================
// SUBMIT VOLUNTEER APPLICATION
// ======================================

if (form) {

    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            if (!form.checkValidity()) {

                form.reportValidity();

                return;

            }


            // ==================================
            // LOGIN CHECK
            // ==================================

            const userToken =
                localStorage.getItem(
                    "kindlinkToken"
                );


            const accountType =
                localStorage.getItem(
                    "kindlinkAccountType"
                );


            if (
                !userToken ||
                accountType !== "user"
            ) {

                alert(
                    "Please login as a user before applying."
                );


                window.location.href =
                    "login.html";


                return;

            }


            if (!selectedOpportunityId) {

                alert(
                    "Volunteer opportunity not found."
                );

                return;

            }


            // ==================================
            // GET FORM VALUES
            // ==================================

            const name =
                document
                    .getElementById(
                        "volunteerName"
                    )
                    .value
                    .trim();


            const age =
                Number(
                    document
                        .getElementById(
                            "volunteerAge"
                        )
                        .value
                );


            const email =
                document
                    .getElementById(
                        "volunteerEmail"
                    )
                    .value
                    .trim();


            const phone =
                document
                    .getElementById(
                        "volunteerPhone"
                    )
                    .value
                    .trim();


            const skills =
                document
                    .getElementById(
                        "volunteerSkills"
                    )
                    .value
                    .trim();


            const message =
                document
                    .getElementById(
                        "volunteerMessage"
                    )
                    .value
                    .trim();


            // ==================================
            // SUBMIT BUTTON
            // ==================================

            const submitButton =
                form.querySelector(
                    ".submit-volunteer-btn"
                );


            if (submitButton) {

                submitButton.disabled =
                    true;


                submitButton.textContent =
                    "Submitting...";

            }


            try {

                const response =
                    await fetch(

                        `${API_URL}/api/volunteers/${selectedOpportunityId}/apply`,

                        {

                            method:
                                "POST",

                            headers: {

                                "Content-Type":
                                    "application/json",

                                Authorization:
                                    `Bearer ${userToken}`

                            },

                            body:
                                JSON.stringify({

                                    name,
                                    age,
                                    email,
                                    phone,
                                    skills,
                                    message

                                })

                        }

                    );


                let data = {};


                try {

                    data =
                        await response.json();

                } catch (error) {

                    console.error(
                        "Unable to read application response."
                    );

                }


                // ==================================
                // INVALID LOGIN
                // ==================================

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
                        "Your login session has expired. Please login again."
                    );


                    window.location.href =
                        "login.html";


                    return;

                }


                // ==================================
                // FAILED
                // ==================================

                if (!response.ok) {

                    alert(
                        data.message ||
                        "Unable to submit application."
                    );

                    return;

                }


                // ==================================
                // SUCCESS
                // ==================================

                form.style.display =
                    "none";


                if (success) {

                    success.style.display =
                        "block";

                }


            } catch (error) {

                console.error(
                    "Volunteer Application Error:",
                    error
                );


                alert(
                    "Unable to connect to the KindLink server."
                );

            } finally {

                if (submitButton) {

                    submitButton.disabled =
                        false;


                    submitButton.textContent =
                        "Submit Application";

                }

            }

        }
    );

}



        // ======================================
        // ESCAPE HTML
        // ======================================

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



        // ======================================
        // START
        // ======================================

        loadVolunteerOpportunities();

    }
);