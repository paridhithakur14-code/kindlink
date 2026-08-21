document.addEventListener("DOMContentLoaded", () => {

    const searchInput =
        document.getElementById("storySearch");

    const filterButtons =
        document.querySelectorAll(".story-filter");

    const cards =
        document.querySelectorAll(".impact-story-card");

    const count =
        document.getElementById("storyCount");

    const noResults =
        document.getElementById("noStoryResults");

    let selectedCategory = "all";


    function filterStories() {

        const search =
            searchInput.value.toLowerCase().trim();

        let visible = 0;

        cards.forEach(card => {

            const text =
                card.textContent.toLowerCase();

            const category =
                card.dataset.category;

            const matchSearch =
                text.includes(search);

            const matchCategory =
                selectedCategory === "all" ||
                selectedCategory === category;

            if (matchSearch && matchCategory) {

                card.classList.remove("hidden");
                visible++;

            } else {

                card.classList.add("hidden");

            }

        });


        count.textContent =
            `${visible} ${visible === 1 ? "story" : "stories"}`;

        noResults.style.display =
            visible === 0 ? "block" : "none";

    }


    searchInput.addEventListener(
        "input",
        filterStories
    );


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            selectedCategory =
                button.dataset.category;

            filterStories();

        });

    });


    /* ===============================
       STORY DATA
    =============================== */

    const stories = {

        education: {

            emoji: "📚",

            category: "Education",

            title:
                "A classroom filled with new possibilities.",

            text: `
                <p>
                    A group of volunteers joined a weekend
                    learning initiative to support children who
                    needed additional academic guidance.
                </p>

                <p>
                    Volunteers helped organize books, explain
                    basic concepts and create activities that
                    made learning more engaging.
                </p>

                <p>
                    The story shows how giving even a few hours
                    can create meaningful learning opportunities.
                </p>
            `,

            quote:
                "A little support can help a learner believe in their potential."

        },


        animal: {

            emoji: "🐶",

            category: "Animal Welfare",

            title:
                "From rescue to a loving home.",

            text: `
                <p>
                    An injured dog was brought to a local
                    animal welfare organization where volunteers
                    helped provide food, care and rehabilitation.
                </p>

                <p>
                    After recovering, the animal was listed
                    for adoption and eventually connected with
                    a caring family.
                </p>

                <p>
                    Rescue, rehabilitation and responsible
                    adoption together gave the animal
                    a second chance.
                </p>
            `,

            quote:
                "Adoption does not change the whole world, but it can change one life completely."

        },


        food: {

            emoji: "🍲",

            category: "Community Support",

            title:
                "Meals shared with dignity.",

            text: `
                <p>
                    Community volunteers worked together
                    to organize meals for families who
                    needed temporary support.
                </p>

                <p>
                    Some volunteers prepared packages,
                    while others helped with distribution
                    and coordination.
                </p>

                <p>
                    The activity showed how coordinated
                    community action can turn small
                    contributions into meaningful support.
                </p>
            `,

            quote:
                "Helping becomes powerful when a community works together."

        },


        environment: {

            emoji: "🌱",

            category: "Environment",

            title:
                "A greener neighbourhood.",

            text: `
                <p>
                    Students, residents and volunteers
                    participated in a local plantation drive.
                </p>

                <p>
                    Along with planting saplings, participants
                    discussed responsible waste management
                    and environmental awareness.
                </p>

                <p>
                    The activity encouraged people to think
                    about the environment as a shared
                    responsibility.
                </p>
            `,

            quote:
                "A greener future begins with actions taken today."

        },


        emergency: {

            emoji: "🚨",

            category: "Emergency Response",

            title:
                "Help arrived when it mattered.",

            text: `
                <p>
                    During an emergency situation,
                    community volunteers came together
                    to help organize essential supplies.
                </p>

                <p>
                    Different people contributed through
                    transportation, communication and
                    resource distribution.
                </p>

                <p>
                    Coordinated information helped ensure
                    assistance reached people more efficiently.
                </p>
            `,

            quote:
                "In an emergency, fast and coordinated support can make a meaningful difference."

        },


        volunteer: {

            emoji: "🤝",

            category: "Volunteering",

            title:
                "One weekend. Many smiles.",

            text: `
                <p>
                    A group of young volunteers dedicated
                    part of their weekend to supporting
                    a community activity.
                </p>

                <p>
                    Some helped organize resources,
                    others communicated with participants
                    and supported the event team.
                </p>

                <p>
                    It demonstrated that volunteering
                    does not always require large amounts
                    of time — willingness matters too.
                </p>
            `,

            quote:
                "You do not need to do everything. You only need to begin somewhere."

        }

    };


    /* ===============================
       STORY MODAL
    =============================== */

    const modal =
        document.getElementById("storyModal");

    const closeButton =
        document.getElementById("closeStoryModal");

    const modalEmoji =
        document.getElementById("storyModalEmoji");

    const modalCategory =
        document.getElementById("storyModalCategory");

    const modalTitle =
        document.getElementById("storyModalTitle");

    const modalText =
        document.getElementById("storyModalText");

    const modalQuote =
        document.getElementById("storyModalQuote");


    document
        .querySelectorAll(".read-story-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                const story =
                    stories[button.dataset.story];

                if (!story) return;

                modalEmoji.textContent =
                    story.emoji;

                modalCategory.textContent =
                    story.category;

                modalTitle.textContent =
                    story.title;

                modalText.innerHTML =
                    story.text;

                modalQuote.textContent =
                    story.quote;

                modal.classList.add("open");

                document.body.style.overflow =
                    "hidden";

            });

        });


    function closeStory() {

        modal.classList.remove("open");

        document.body.style.overflow = "";

    }


    closeButton.addEventListener(
        "click",
        closeStory
    );


    modal.addEventListener("click", event => {

        if (event.target === modal) {
            closeStory();
        }

    });


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeStory();
        }

    });

});