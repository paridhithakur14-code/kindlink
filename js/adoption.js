/* =========================================
   KINDLINK - ADOPTION PAGE
========================================= */


const animalSearch =
    document.getElementById("animalSearch");

const locationFilter =
    document.getElementById("locationFilter");

const animalFilters =
    document.querySelectorAll(".animal-filter");

const animalCards =
    Array.from(document.querySelectorAll(".animal-card"));

const animalCount =
    document.getElementById("animalCount");

const animalNoResults =
    document.getElementById("animalNoResults");


let selectedAnimalType = "all";



/* =========================================
   FILTER ANIMALS
========================================= */

function filterAnimals() {

    const search =
        animalSearch.value.toLowerCase().trim();

    const location =
        locationFilter.value;


    let visibleAnimals = 0;


    animalCards.forEach(card => {

        const type =
            card.dataset.type;

        const name =
            card.dataset.name.toLowerCase();

        const cardLocation =
            card.dataset.location;


        const typeMatch =
            selectedAnimalType === "all" ||
            type === selectedAnimalType;


        const searchMatch =
            name.includes(search);


        const locationMatch =
            location === "all" ||
            cardLocation === location;


        if (
            typeMatch &&
            searchMatch &&
            locationMatch
        ) {

            card.classList.remove("hidden");

            visibleAnimals++;

        } else {

            card.classList.add("hidden");

        }

    });


    animalCount.textContent =
        `${visibleAnimals} animal${visibleAnimals !== 1 ? "s" : ""}`;


    if (visibleAnimals === 0) {

        animalNoResults.classList.add("show");

    } else {

        animalNoResults.classList.remove("show");

    }

}



/* =========================================
   ANIMAL TYPE FILTER
========================================= */

animalFilters.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            animalFilters.forEach(
                btn => btn.classList.remove("active")
            );


            button.classList.add("active");


            selectedAnimalType =
                button.dataset.type;


            filterAnimals();

        }
    );

});



/* =========================================
   SEARCH
========================================= */

animalSearch.addEventListener(
    "input",
    filterAnimals
);



/* =========================================
   LOCATION
========================================= */

locationFilter.addEventListener(
    "change",
    filterAnimals
);



/* =========================================
   ANIMAL DATA
========================================= */

const animals = {

    Bruno: {

        icon: "🐕",

        description:
            "Friendly, playful and loves being around people.",

        breed:
            "Labrador Mix",

        age:
            "2 years",

        gender:
            "Male",

        location:
            "Pune"

    },


    Luna: {

        icon: "🐈",

        description:
            "A calm and affectionate cat looking for a peaceful home.",

        breed:
            "Indie Cat",

        age:
            "1.5 years",

        gender:
            "Female",

        location:
            "Mumbai"

    },


    Max: {

        icon: "🐕‍🦺",

        description:
            "Energetic and loyal. Max loves outdoor activities and walks.",

        breed:
            "Indie Dog",

        age:
            "3 years",

        gender:
            "Male",

        location:
            "Delhi"

    },


    Milo: {

        icon:
            "🐈‍⬛",

        description:
            "Gentle and curious. Milo enjoys quiet spaces and cuddles.",

        breed:
            "Persian Mix",

        age:
            "2 years",

        gender:
            "Male",

        location:
            "Bangalore"

    },


    Coco: {

        icon:
            "🐰",

        description:
            "A sweet and gentle rabbit who enjoys peaceful surroundings.",

        breed:
            "Rabbit",

        age:
            "1 year",

        gender:
            "Female",

        location:
            "Pune"

    },


    Rocky: {

        icon:
            "🦮",

        description:
            "Smart, affectionate and looking for an active family.",

        breed:
            "Golden Mix",

        age:
            "4 years",

        gender:
            "Male",

        location:
            "Mumbai"

    }

};



/* =========================================
   MODAL ELEMENTS
========================================= */

const animalModal =
    document.getElementById("animalModal");

const modalAnimalIcon =
    document.getElementById("modalAnimalIcon");

const modalAnimalName =
    document.getElementById("modalAnimalName");

const modalAnimalText =
    document.getElementById("modalAnimalText");

const modalBreed =
    document.getElementById("modalBreed");

const modalAge =
    document.getElementById("modalAge");

const modalGender =
    document.getElementById("modalGender");

const modalLocation =
    document.getElementById("modalLocation");



/* =========================================
   OPEN ANIMAL
========================================= */

function openAnimal(name) {

    const animal =
        animals[name];


    if (!animal) {
        return;
    }


    modalAnimalIcon.textContent =
        animal.icon;

    modalAnimalName.textContent =
        name;

    modalAnimalText.textContent =
        animal.description;

    modalBreed.textContent =
        animal.breed;

    modalAge.textContent =
        animal.age;

    modalGender.textContent =
        animal.gender;

    modalLocation.textContent =
        animal.location;


    animalModal.classList.add("show");

    document.body.style.overflow =
        "hidden";

}



/* =========================================
   CLOSE ANIMAL
========================================= */

function closeAnimal() {

    animalModal.classList.remove("show");

    document.body.style.overflow =
        "";

}



/* =========================================
   APPLY FOR ADOPTION
========================================= */

function applyForAdoption() {

    alert(
        "Adoption application will be available after user login is implemented."
    );

}



/* =========================================
   CLOSE MODAL ON BACKGROUND
========================================= */

animalModal.addEventListener(
    "click",
    event => {

        if (
            event.target === animalModal
        ) {

            closeAnimal();

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
            event.key === "Escape"
        ) {

            closeAnimal();

        }

    }
);