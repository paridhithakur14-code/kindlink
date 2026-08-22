// ==========================================
// KINDLINK ORGANISATIONS
// ==========================================


// ==========================================
// MOBILE MENU
// ==========================================

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.querySelector(".nav-links");


if (menuBtn && navLinks) {

    menuBtn.addEventListener(
        "click",
        function () {

            navLinks.classList.toggle(
                "active"
            );

        }
    );

}


// ==========================================
// ORGANISATION FILTERS
// ==========================================

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const locationFilter =
    document.getElementById("locationFilter");

const organisationCards =
    document.querySelectorAll(
        ".organisation-card"
    );

const resultCount =
    document.getElementById("resultCount");

const emptyState =
    document.getElementById("emptyState");

const clearFilters =
    document.getElementById("clearFilters");



function filterOrganisations() {

    if (
        !searchInput ||
        !categoryFilter ||
        !locationFilter
    ) {

        return;

    }


    const searchValue =
        searchInput.value
            .trim()
            .toLowerCase();


    const selectedCategory =
        categoryFilter.value;


    const selectedLocation =
        locationFilter.value;


    let visibleCount = 0;


    organisationCards.forEach(
        function (card) {

            const organisationName =
                card.dataset.name
                    .toLowerCase();


            const organisationCategory =
                card.dataset.category
                    .toLowerCase();


            const organisationLocation =
                card.dataset.location
                    .toLowerCase();


            const matchesSearch =
                organisationName.includes(
                    searchValue
                );


            const matchesCategory =
                selectedCategory === "all" ||
                organisationCategory.includes(
                    selectedCategory
                );


            const matchesLocation =
                selectedLocation === "all" ||
                organisationLocation ===
                    selectedLocation;


            if (
                matchesSearch &&
                matchesCategory &&
                matchesLocation
            ) {

                card.style.display =
                    "block";

                visibleCount++;

            }

            else {

                card.style.display =
                    "none";

            }

        }
    );


    // UPDATE RESULT COUNT

    if (resultCount) {

        resultCount.textContent =
            `Showing ${visibleCount} organisation${
                visibleCount !== 1
                    ? "s"
                    : ""
            }`;

    }


    // EMPTY STATE

    if (emptyState) {

        if (visibleCount === 0) {

            emptyState.classList.add(
                "show"
            );

        }

        else {

            emptyState.classList.remove(
                "show"
            );

        }

    }

}


// ==========================================
// SEARCH EVENTS
// ==========================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterOrganisations
    );

}


if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        filterOrganisations
    );

}


if (locationFilter) {

    locationFilter.addEventListener(
        "change",
        filterOrganisations
    );

}


// ==========================================
// CLEAR FILTERS
// ==========================================

if (clearFilters) {

    clearFilters.addEventListener(
        "click",
        function () {

            searchInput.value = "";

            categoryFilter.value =
                "all";

            locationFilter.value =
                "all";

            filterOrganisations();

        }
    );

}


// ==========================================
// COPY ORGANISATION LINK
// ==========================================

const copyLink =
    document.getElementById("copyLink");

const copyMessage =
    document.getElementById("copyMessage");


if (copyLink) {

    copyLink.addEventListener(
        "click",
        async function () {

            try {

                await navigator.clipboard.writeText(
                    window.location.href
                );

                copyMessage.textContent =
                    "Organisation link copied!";


                setTimeout(
                    function () {

                        copyMessage.textContent =
                            "";

                    },
                    2500
                );

            }

            catch (error) {

                copyMessage.textContent =
                    "Unable to copy link.";

            }

        }
    );

}