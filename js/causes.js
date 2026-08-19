/* =========================================
   KINDLINK - CAUSES PAGE
========================================= */


const searchInput = document.getElementById("causeSearch");

const categoryButtons =
    document.querySelectorAll(".category-btn");

const campaignGrid =
    document.getElementById("campaignGrid");

const campaignCards =
    Array.from(document.querySelectorAll(".campaign-card"));

const resultCount =
    document.getElementById("resultCount");

const noResults =
    document.getElementById("noResults");

const sortSelect =
    document.getElementById("sortCauses");


let selectedCategory = "all";



/* =========================================
   FILTER CAMPAIGNS
========================================= */

function filterCampaigns() {

    const searchText =
        searchInput.value.toLowerCase().trim();


    let visibleCards = [];


    campaignCards.forEach(card => {

        const category =
            card.dataset.category;

        const title =
            card.dataset.title.toLowerCase();


        const categoryMatch =
            selectedCategory === "all" ||
            category === selectedCategory;


        const searchMatch =
            title.includes(searchText);


        if (categoryMatch && searchMatch) {

            card.classList.remove("hidden");

            visibleCards.push(card);

        } else {

            card.classList.add("hidden");

        }

    });


    resultCount.textContent =
        `${visibleCards.length} campaign${visibleCards.length !== 1 ? "s" : ""}`;


    if (visibleCards.length === 0) {

        noResults.classList.add("show");

    } else {

        noResults.classList.remove("show");

    }

}



/* =========================================
   CATEGORY BUTTONS
========================================= */

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        selectedCategory =
            button.dataset.category;


        filterCampaigns();

    });

});



/* =========================================
   SEARCH
========================================= */

searchInput.addEventListener(
    "input",
    filterCampaigns
);



/* =========================================
   SORT
========================================= */

sortSelect.addEventListener(
    "change",
    () => {

        const value =
            sortSelect.value;


        if (value === "progress") {

            campaignCards.sort((a, b) => {

                return (
                    Number(b.dataset.progress) -
                    Number(a.dataset.progress)
                );

            });

        }


        else if (value === "urgent") {

            campaignCards.sort((a, b) => {

                return (
                    Number(b.dataset.urgent === "true") -
                    Number(a.dataset.urgent === "true")
                );

            });

        }


        else {

            campaignCards.sort(() => 0);

        }


        campaignCards.forEach(card => {

            campaignGrid.appendChild(card);

        });


        filterCampaigns();

    }
);



/* =========================================
   DONATION MODAL
========================================= */

const donationModal =
    document.getElementById("donationModal");

const donationCause =
    document.getElementById("donationCause");

const customAmount =
    document.getElementById("customAmount");



function openDonation(causeName) {

    donationCause.textContent =
        causeName;

    customAmount.value = "";

    donationModal.classList.add("show");

    document.body.style.overflow = "hidden";

}



function closeDonation() {

    donationModal.classList.remove("show");

    document.body.style.overflow = "";

}



function selectAmount(amount) {

    customAmount.value = amount;

}



function processDonation() {

    const amount =
        Number(customAmount.value);


    if (!amount || amount <= 0) {

        alert("Please enter a valid donation amount.");

        return;

    }


    alert(
        `Thank you! Your donation of ₹${amount} is ready to be processed.`
    );


    closeDonation();

}



/* =========================================
   CLOSE MODAL ON BACKGROUND CLICK
========================================= */

donationModal.addEventListener(
    "click",
    event => {

        if (event.target === donationModal) {

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

        if (event.key === "Escape") {

            closeDonation();

        }

    }
);