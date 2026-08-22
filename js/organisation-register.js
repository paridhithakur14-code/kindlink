// ==========================================
// KINDLINK ORGANISATION REGISTRATION
// ==========================================


// ==========================================
// ELEMENTS
// ==========================================

const organisationForm =
    document.getElementById("organisationForm");

const organisationName =
    document.getElementById("organisationName");

const organisationType =
    document.getElementById("organisationType");

const registrationNumber =
    document.getElementById("registrationNumber");

const contactName =
    document.getElementById("contactName");

const email =
    document.getElementById("email");

const phone =
    document.getElementById("phone");

const address =
    document.getElementById("address");

const city =
    document.getElementById("city");

const state =
    document.getElementById("state");

const description =
    document.getElementById("description");

const verificationDocument =
    document.getElementById("verificationDocument");

const password =
    document.getElementById("password");

const confirmPassword =
    document.getElementById("confirmPassword");

const terms =
    document.getElementById("terms");


// ==========================================
// ERRORS
// ==========================================

const organisationNameError =
    document.getElementById("organisationNameError");

const organisationTypeError =
    document.getElementById("organisationTypeError");

const registrationNumberError =
    document.getElementById("registrationNumberError");

const contactNameError =
    document.getElementById("contactNameError");

const emailError =
    document.getElementById("emailError");

const phoneError =
    document.getElementById("phoneError");

const addressError =
    document.getElementById("addressError");

const cityError =
    document.getElementById("cityError");

const stateError =
    document.getElementById("stateError");

const descriptionError =
    document.getElementById("descriptionError");

const documentError =
    document.getElementById("documentError");

const passwordError =
    document.getElementById("passwordError");

const confirmPasswordError =
    document.getElementById("confirmPasswordError");

const termsError =
    document.getElementById("termsError");


// ==========================================
// EXTRA ELEMENTS
// ==========================================

const togglePassword =
    document.getElementById("togglePassword");

const fileName =
    document.getElementById("fileName");

const characterCount =
    document.getElementById("characterCount");

const successModal =
    document.getElementById("successModal");

const continueBtn =
    document.getElementById("continueBtn");

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.querySelector(".nav-links");


// ==========================================
// EMAIL VALIDATION
// ==========================================

function validateEmail(value) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(value);

}


// ==========================================
// PHONE
// ==========================================

phone.addEventListener("input", function () {

    this.value =
        this.value.replace(/\D/g, "");

    phoneError.textContent = "";

});


// ==========================================
// DESCRIPTION COUNT
// ==========================================

description.addEventListener("input", function () {

    characterCount.textContent =
        `${description.value.length} / 500`;

    descriptionError.textContent = "";

});


// ==========================================
// FILE NAME
// ==========================================

verificationDocument.addEventListener(
    "change",
    function () {

        documentError.textContent = "";

        if (
            verificationDocument.files.length > 0
        ) {

            const file =
                verificationDocument.files[0];

            fileName.textContent =
                file.name;

        }

        else {

            fileName.textContent =
                "No file selected";

        }

    }
);


// ==========================================
// SHOW PASSWORD
// ==========================================

togglePassword.addEventListener(
    "click",
    function () {

        const icon =
            togglePassword.querySelector("i");


        if (password.type === "password") {

            password.type = "text";

            icon.classList.remove(
                "fa-eye"
            );

            icon.classList.add(
                "fa-eye-slash"
            );

        }

        else {

            password.type = "password";

            icon.classList.remove(
                "fa-eye-slash"
            );

            icon.classList.add(
                "fa-eye"
            );

        }

    }
);


// ==========================================
// CLEAR ERRORS
// ==========================================

function clearErrors() {

    organisationNameError.textContent = "";

    organisationTypeError.textContent = "";

    registrationNumberError.textContent = "";

    contactNameError.textContent = "";

    emailError.textContent = "";

    phoneError.textContent = "";

    addressError.textContent = "";

    cityError.textContent = "";

    stateError.textContent = "";

    descriptionError.textContent = "";

    documentError.textContent = "";

    passwordError.textContent = "";

    confirmPasswordError.textContent = "";

    termsError.textContent = "";

}


// ==========================================
// FORM SUBMISSION
// ==========================================

organisationForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        clearErrors();

        let valid = true;


        // ORGANISATION NAME

        if (
            organisationName.value.trim() === ""
        ) {

            organisationNameError.textContent =
                "Please enter the organisation name.";

            valid = false;

        }


        // ORGANISATION TYPE

        if (
            organisationType.value === ""
        ) {

            organisationTypeError.textContent =
                "Please select organisation type.";

            valid = false;

        }


        // REGISTRATION NUMBER

        if (
            registrationNumber.value.trim() === ""
        ) {

            registrationNumberError.textContent =
                "Please enter the registration number.";

            valid = false;

        }


        // CONTACT PERSON

        if (
            contactName.value.trim() === ""
        ) {

            contactNameError.textContent =
                "Please enter the contact person's name.";

            valid = false;

        }


        // EMAIL

        if (
            email.value.trim() === ""
        ) {

            emailError.textContent =
                "Please enter the organisation email.";

            valid = false;

        }

        else if (
            !validateEmail(email.value.trim())
        ) {

            emailError.textContent =
                "Please enter a valid email address.";

            valid = false;

        }


        // PHONE

        if (
            phone.value.length !== 10
        ) {

            phoneError.textContent =
                "Phone number must contain 10 digits.";

            valid = false;

        }


        // ADDRESS

        if (
            address.value.trim() === ""
        ) {

            addressError.textContent =
                "Please enter the organisation address.";

            valid = false;

        }


        // CITY

        if (
            city.value.trim() === ""
        ) {

            cityError.textContent =
                "Please enter the city.";

            valid = false;

        }


        // STATE

        if (
            state.value.trim() === ""
        ) {

            stateError.textContent =
                "Please enter the state.";

            valid = false;

        }


        // DESCRIPTION

        if (
            description.value.trim() === ""
        ) {

            descriptionError.textContent =
                "Please describe your organisation.";

            valid = false;

        }

        else if (
            description.value.trim().length < 30
        ) {

            descriptionError.textContent =
                "Please provide at least 30 characters.";

            valid = false;

        }


        // DOCUMENT

        if (
            verificationDocument.files.length === 0
        ) {

            documentError.textContent =
                "Please upload a verification document.";

            valid = false;

        }


        // PASSWORD

        if (
            password.value.length < 6
        ) {

            passwordError.textContent =
                "Password must contain at least 6 characters.";

            valid = false;

        }


        // CONFIRM PASSWORD

        if (
            confirmPassword.value === ""
        ) {

            confirmPasswordError.textContent =
                "Please confirm your password.";

            valid = false;

        }

        else if (
            password.value !==
            confirmPassword.value
        ) {

            confirmPasswordError.textContent =
                "Passwords do not match.";

            valid = false;

        }


        // TERMS

        if (!terms.checked) {

            termsError.textContent =
                "Please accept the verification terms.";

            valid = false;

        }


        // STOP IF INVALID

        if (!valid) {

            return;

        }


        // ==========================================
        // SELECTED CAUSES
        // ==========================================

        const causes = [];

        document
            .querySelectorAll(
                'input[name="cause"]:checked'
            )
            .forEach(function (item) {

                causes.push(item.value);

            });


        // ==========================================
        // ORGANISATION OBJECT
        // ==========================================

        const organisationData = {

            organisationName:
                organisationName.value.trim(),

            organisationType:
                organisationType.value,

            registrationNumber:
                registrationNumber.value.trim(),

            yearEstablished:
                document
                    .getElementById(
                        "yearEstablished"
                    )
                    .value,

            contactPerson: {

                name:
                    contactName.value.trim(),

                designation:
                    document
                        .getElementById(
                            "designation"
                        )
                        .value
                        .trim(),

                email:
                    email.value.trim(),

                phone:
                    phone.value.trim()

            },

            location: {

                address:
                    address.value.trim(),

                city:
                    city.value.trim(),

                state:
                    state.value.trim()

            },

            causes:
                causes,

            description:
                description.value.trim(),

            website:
                document
                    .getElementById(
                        "website"
                    )
                    .value
                    .trim(),

            socialLink:
                document
                    .getElementById(
                        "socialLink"
                    )
                    .value
                    .trim(),

            verificationStatus:
                "pending"

        };


        console.log(
            "KindLink Organisation:",
            organisationData
        );


        /*
        ==========================================
        BACKEND PHASE

        Later this data will be submitted using:

        POST /api/auth/register/organisation

        The verification document will use
        FormData / multipart upload.

        MongoDB will store:

        verificationStatus: "pending"

        Passwords must be hashed with bcrypt
        on the backend.

        ==========================================
        */


        successModal.classList.add(
            "show"
        );

    }
);


// ==========================================
// RETURN TO LOGIN
// ==========================================

continueBtn.addEventListener(
    "click",
    function () {

        window.location.href =
            "login.html";

    }
);


// ==========================================
// MOBILE NAVIGATION
// ==========================================

menuBtn.addEventListener(
    "click",
    function () {

        navLinks.classList.toggle(
            "active"
        );

    }
);


// ==========================================
// CLEAR INDIVIDUAL ERRORS
// ==========================================

organisationName.addEventListener(
    "input",
    function () {

        organisationNameError.textContent = "";

    }
);

organisationType.addEventListener(
    "change",
    function () {

        organisationTypeError.textContent = "";

    }
);

registrationNumber.addEventListener(
    "input",
    function () {

        registrationNumberError.textContent = "";

    }
);

contactName.addEventListener(
    "input",
    function () {

        contactNameError.textContent = "";

    }
);

email.addEventListener(
    "input",
    function () {

        emailError.textContent = "";

    }
);

address.addEventListener(
    "input",
    function () {

        addressError.textContent = "";

    }
);

city.addEventListener(
    "input",
    function () {

        cityError.textContent = "";

    }
);

state.addEventListener(
    "input",
    function () {

        stateError.textContent = "";

    }
);

password.addEventListener(
    "input",
    function () {

        passwordError.textContent = "";

    }
);

confirmPassword.addEventListener(
    "input",
    function () {

        confirmPasswordError.textContent = "";

    }
);

terms.addEventListener(
    "change",
    function () {

        termsError.textContent = "";

    }
);