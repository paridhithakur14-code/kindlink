document.addEventListener("DOMContentLoaded", () => {

    const searchInput =
        document.getElementById("volunteerSearch");

    const locationFilter =
        document.getElementById("locationFilter");

    const filterButtons =
        document.querySelectorAll(".volunteer-filter");

    const cards =
        document.querySelectorAll(".opportunity-card");

    const count =
        document.getElementById("opportunityCount");

    const noResults =
        document.getElementById("noVolunteerResults");

    let selectedCategory = "all";


    function filterOpportunities() {

        const search =
            searchInput.value.toLowerCase().trim();

        const location =
            locationFilter.value;

        let visible = 0;

        cards.forEach(card => {

            const text =
                card.textContent.toLowerCase();

            const category =
                card.dataset.category;

            const cardLocation =
                card.dataset.location;

            const matchesSearch =
                text.includes(search);

            const matchesCategory =
                selectedCategory === "all" ||
                category === selectedCategory;

            const matchesLocation =
                location === "all" ||
                cardLocation === location;

            if (
                matchesSearch &&
                matchesCategory &&
                matchesLocation
            ) {

                card.classList.remove("hidden");
                visible++;

            } else {

                card.classList.add("hidden");

            }

        });


        count.textContent =
            `${visible} ${visible === 1 ? "opportunity" : "opportunities"}`;

        noResults.style.display =
            visible === 0 ? "block" : "none";

    }


    searchInput.addEventListener(
        "input",
        filterOpportunities
    );


    locationFilter.addEventListener(
        "change",
        filterOpportunities
    );


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            selectedCategory =
                button.dataset.category;

            filterOpportunities();

        });

    });


    /* =====================================
       APPLICATION MODAL
    ===================================== */

    const modal =
        document.getElementById("volunteerModal");

    const closeModal =
        document.getElementById("closeVolunteerModal");

    const applyButtons =
        document.querySelectorAll(".apply-btn");

    const modalRole =
        document.getElementById("modalVolunteerRole");

    const modalOrganization =
        document.getElementById("modalOrganization");

    const form =
        document.getElementById("volunteerForm");

    const success =
        document.getElementById("volunteerSuccess");

    const closeSuccess =
        document.getElementById("closeSuccess");


    applyButtons.forEach(button => {

        button.addEventListener("click", () => {

            modalRole.textContent =
                button.dataset.role;

            modalOrganization.textContent =
                button.dataset.organization;

            form.style.display = "block";
            success.style.display = "none";

            modal.classList.add("open");

            document.body.style.overflow = "hidden";

        });

    });


    function closeVolunteerModal() {

        modal.classList.remove("open");

        document.body.style.overflow = "";

        form.reset();

    }


    closeModal.addEventListener(
        "click",
        closeVolunteerModal
    );


    closeSuccess.addEventListener(
        "click",
        closeVolunteerModal
    );


    modal.addEventListener("click", event => {

        if (event.target === modal) {
            closeVolunteerModal();
        }

    });


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeVolunteerModal();
        }

    });


    form.addEventListener("submit", event => {

        event.preventDefault();

        if (!form.checkValidity()) {

            form.reportValidity();
            return;

        }

        form.style.display = "none";

        success.style.display = "block";

    });

});
