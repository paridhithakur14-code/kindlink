/* =========================================
   KINDLINK - EMERGENCY RESPONSE
========================================= */


/* =========================================
   EMERGENCY DATA
========================================= */

const emergencies = {

    assam: {

        title:
            "Assam Flood Relief",

        description:
            "Heavy flooding has affected communities across several districts. Relief teams are providing food, water and medical support.",

        location:
            "Assam, India",

        severity:
            "Critical",

        people:
            "8,500+",

        organizations:
            "7",

        needs: [
            "🍚 Food",
            "💧 Clean water",
            "🏥 Medical supplies",
            "🛶 Rescue support",
            "🧴 Hygiene kits"
        ]

    },


    himachal: {

        title:
            "Mountain Relief Response",

        description:
            "Relief organizations are helping families affected by infrastructure damage and temporary displacement.",

        location:
            "Himachal Pradesh, India",

        severity:
            "High Priority",

        people:
            "4,200+",

        organizations:
            "5",

        needs: [
            "⛺ Temporary shelter",
            "🧥 Warm clothing",
            "🍲 Food",
            "💊 Medicine"
        ]

    },


    odisha: {

        title:
            "Coastal Relief Mission",

        description:
            "Local organizations are distributing food, clean water and emergency supplies to affected families.",

        location:
            "Odisha, India",

        severity:
            "High Priority",

        people:
            "6,700+",

        organizations:
            "6",

        needs: [
            "💧 Clean water",
            "🍚 Food",
            "🔦 Emergency supplies",
            "🏠 Shelter materials"
        ]

    }

};



/* =========================================
   MODAL ELEMENTS
========================================= */

const emergencyModal =
    document.getElementById("emergencyModal");

const modalEmergencyTitle =
    document.getElementById("modalEmergencyTitle");

const modalEmergencyDescription =
    document.getElementById("modalEmergencyDescription");

const modalEmergencyLocation =
    document.getElementById("modalEmergencyLocation");

const modalEmergencySeverity =
    document.getElementById("modalEmergencySeverity");

const modalEmergencyPeople =
    document.getElementById("modalEmergencyPeople");

const modalEmergencyOrgs =
    document.getElementById("modalEmergencyOrgs");

const modalNeeds =
    document.getElementById("modalNeeds");



/* =========================================
   OPEN EMERGENCY
========================================= */

function openEmergency(id) {

    const emergency =
        emergencies[id];


    if (!emergency) {
        return;
    }


    modalEmergencyTitle.textContent =
        emergency.title;


    modalEmergencyDescription.textContent =
        emergency.description;


    modalEmergencyLocation.textContent =
        emergency.location;


    modalEmergencySeverity.textContent =
        emergency.severity;


    modalEmergencyPeople.textContent =
        emergency.people;


    modalEmergencyOrgs.textContent =
        emergency.organizations;


    modalNeeds.innerHTML = "";


    emergency.needs.forEach(
        need => {

            const span =
                document.createElement("span");

            span.textContent =
                need;

            modalNeeds.appendChild(span);

        }
    );


    emergencyModal.classList.add("show");

    document.body.style.overflow =
        "hidden";

}



/* =========================================
   CLOSE EMERGENCY
========================================= */

function closeEmergency() {

    emergencyModal.classList.remove("show");

    document.body.style.overflow =
        "";

}



/* =========================================
   HELP ACTION
========================================= */

function showHelpMessage(type) {

    if (type === "donate") {

        alert(
            "Donation system will be connected in the backend phase."
        );

    }


    else if (type === "volunteer") {

        openVolunteerForm();

    }


    else if (type === "rescue") {

        openVolunteerForm();

    }


    else if (type === "supplies") {

        alert(
            "Supply coordination will be connected with verified organizations."
        );

    }

}



/* =========================================
   VOLUNTEER MODAL
========================================= */

const volunteerModal =
    document.getElementById("volunteerModal");


function openVolunteerForm() {

    volunteerModal.classList.add("show");

    document.body.style.overflow =
        "hidden";

}


function closeVolunteerForm() {

    volunteerModal.classList.remove("show");

    document.body.style.overflow =
        "";

}



/* =========================================
   VOLUNTEER FORM
========================================= */

const emergencyVolunteerForm =
    document.getElementById(
        "emergencyVolunteerForm"
    );


emergencyVolunteerForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "volunteerName"
            ).value;


        alert(
            `Thank you, ${name}! Your emergency volunteer registration has been received.`
        );


        emergencyVolunteerForm.reset();

        closeVolunteerForm();

    }
);



/* =========================================
   BACKGROUND CLICK
========================================= */

emergencyModal.addEventListener(
    "click",
    event => {

        if (
            event.target === emergencyModal
        ) {

            closeEmergency();

        }

    }
);


volunteerModal.addEventListener(
    "click",
    event => {

        if (
            event.target === volunteerModal
        ) {

            closeVolunteerForm();

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

            closeEmergency();

            closeVolunteerForm();

        }

    }
);