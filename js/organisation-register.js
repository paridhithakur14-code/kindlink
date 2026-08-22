// ==========================================
// KINDLINK ORGANISATION REGISTRATION
// ==========================================


// ==========================================
// DOM ELEMENTS
// ==========================================

const organisationForm =
    document.getElementById("organisationForm");

const organisationName =
    document.getElementById("organisationName");

const organisationType =
    document.getElementById("organisationType");

const registrationNumber =
    document.getElementById("registrationNumber");

const yearEstablished =
    document.getElementById("yearEstablished");

const contactName =
    document.getElementById("contactName");

const designation =
    document.getElementById("designation");

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

const website =
    document.getElementById("website");

const socialLink =
    document.getElementById("socialLink");

const password =
    document.getElementById("password");

const confirmPassword =
    document.getElementById("confirmPassword");

const verificationDocument =
    document.getElementById("verificationDocument");

const terms =
    document.getElementById("terms");


// ==========================================
// ERROR ELEMENTS
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

const passwordError =
    document.getElementById("passwordError");

const confirmPasswordError =
    document.getElementById("confirmPasswordError");

const documentError =
    document.getElementById("documentError");

const termsError =
    document.getElementById("termsError");


// ==========================================
// OTHER ELEMENTS
// ==========================================

const togglePassword =
    document.getElementById("togglePassword");

const successModal =
    document.getElementById("successModal");

const continueBtn =
    document.getElementById("continueBtn");

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.querySelector(".nav-links");

const strengthIndicator =
    document.getElementById("strengthIndicator");

const strengthText =
    document.getElementById("strengthText");


// ==========================================
// EMAIL VALIDATION
// ==========================================

function validateEmail(value) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(value);

}


// ==========================================
// PHONE INPUT
// ==========================================

if (phone) {

    phone.addEventListener(
        "input",
        function () {

            this.value =
                this.value.replace(/\D/g, "");

            if (phoneError) {
                phoneError.textContent = "";
            }

        }
    );

}


// ==========================================
// SHOW / HIDE PASSWORD
// ==========================================

if (togglePassword && password) {

    togglePassword.addEventListener(
        "click",
        function () {

            const icon =
                togglePassword.querySelector("i");


            if (password.type === "password") {

                password.type = "text";

                if (icon) {

                    icon.classList.remove(
                        "fa-eye"
                    );

                    icon.classList.add(
                        "fa-eye-slash"
                    );

                }

            } else {

                password.type = "password";

                if (icon) {

                    icon.classList.remove(
                        "fa-eye-slash"
                    );

                    icon.classList.add(
                        "fa-eye"
                    );

                }

            }

        }
    );

}


// ==========================================
// PASSWORD STRENGTH
// ==========================================

if (password) {

    password.addEventListener(
        "input",
        function () {

            const value =
                password.value;

            let strength = 0;


            if (value.length >= 6) {
                strength++;
            }


            if (/[A-Z]/.test(value)) {
                strength++;
            }


            if (/[0-9]/.test(value)) {
                strength++;
            }


            if (/[^A-Za-z0-9]/.test(value)) {
                strength++;
            }


            updatePasswordStrength(
                strength
            );


            if (passwordError) {
                passwordError.textContent = "";
            }

        }
    );

}


function updatePasswordStrength(strength) {

    if (
        !strengthIndicator ||
        !strengthText
    ) {
        return;
    }


    if (password.value.length === 0) {

        strengthIndicator.style.width =
            "0";

        strengthText.textContent =
            "Password strength";

        return;

    }


    if (strength === 1) {

        strengthIndicator.style.width =
            "25%";

        strengthIndicator.style.background =
            "#d94a4a";

        strengthText.textContent =
            "Weak password";

    }

    else if (strength === 2) {

        strengthIndicator.style.width =
            "50%";

        strengthIndicator.style.background =
            "#e3a12c";

        strengthText.textContent =
            "Fair password";

    }

    else if (strength === 3) {

        strengthIndicator.style.width =
            "75%";

        strengthIndicator.style.background =
            "#79a839";

        strengthText.textContent =
            "Good password";

    }

    else {

        strengthIndicator.style.width =
            "100%";

        strengthIndicator.style.background =
            "#218956";

        strengthText.textContent =
            "Strong password";

    }

}


// ==========================================
// FORM SUBMISSION
// ==========================================

if (organisationForm) {

    organisationForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            clearErrors();

            let valid = true;


            // ==================================
            // ORGANISATION NAME
            // ==================================

            if (
                organisationName.value.trim() === ""
            ) {

                organisationNameError.textContent =
                    "Please enter organisation name.";

                valid = false;

            }


            // ==================================
            // ORGANISATION TYPE
            // ==================================

            if (
                organisationType.value === ""
            ) {

                organisationTypeError.textContent =
                    "Please select organisation type.";

                valid = false;

            }


            // ==================================
            // REGISTRATION NUMBER
            // ==================================

            if (
                registrationNumber.value.trim() === ""
            ) {

                registrationNumberError.textContent =
                    "Please enter registration number.";

                valid = false;

            }


            // ==================================
            // CONTACT PERSON
            // ==================================

            if (
                contactName.value.trim() === ""
            ) {

                contactNameError.textContent =
                    "Please enter contact person name.";

                valid = false;

            }


            // ==================================
            // EMAIL
            // ==================================

            if (email.value.trim() === "") {

                emailError.textContent =
                    "Please enter official email.";

                valid = false;

            }

            else if (
                !validateEmail(
                    email.value.trim()
                )
            ) {

                emailError.textContent =
                    "Please enter a valid email address.";

                valid = false;

            }


            // ==================================
            // PHONE
            // ==================================

            if (phone.value.trim() === "") {

                phoneError.textContent =
                    "Please enter phone number.";

                valid = false;

            }

            else if (
                phone.value.trim().length !== 10
            ) {

                phoneError.textContent =
                    "Phone number must contain 10 digits.";

                valid = false;

            }


            // ==================================
            // ADDRESS
            // ==================================

            if (address.value.trim() === "") {

                addressError.textContent =
                    "Please enter organisation address.";

                valid = false;

            }


            // ==================================
            // CITY
            // ==================================

            if (city.value.trim() === "") {

                cityError.textContent =
                    "Please enter city.";

                valid = false;

            }


            // ==================================
            // STATE
            // ==================================

            if (state.value.trim() === "") {

                stateError.textContent =
                    "Please enter state.";

                valid = false;

            }


            // ==================================
            // DESCRIPTION
            // ==================================

            if (
                description.value.trim() === ""
            ) {

                descriptionError.textContent =
                    "Please describe your organisation.";

                valid = false;

            }

            else if (
                description.value.trim().length > 500
            ) {

                descriptionError.textContent =
                    "Description cannot exceed 500 characters.";

                valid = false;

            }


            // ==================================
            // PASSWORD
            // ==================================

            if (password.value === "") {

                passwordError.textContent =
                    "Please create a password.";

                valid = false;

            }

            else if (
                password.value.length < 6
            ) {

                passwordError.textContent =
                    "Password must contain at least 6 characters.";

                valid = false;

            }


            // ==================================
            // CONFIRM PASSWORD
            // ==================================

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


            // ==================================
            // DOCUMENT
            // ==================================

            if (
                verificationDocument &&
                verificationDocument.files.length === 0
            ) {

                if (documentError) {

                    documentError.textContent =
                        "Please select a verification document.";

                }

                valid = false;

            }


            // ==================================
            // TERMS
            // ==================================

            if (!terms.checked) {

                termsError.textContent =
                    "You must accept the terms and conditions.";

                valid = false;

            }


            // ==================================
            // STOP IF INVALID
            // ==================================

            if (!valid) {
                return;
            }


            // ==================================
            // GET SELECTED CAUSES
            // ==================================

            const selectedCauses = [];

            const causeInputs =
                document.querySelectorAll(
                    'input[name="cause"]:checked'
                );


            causeInputs.forEach(
                function (item) {

                    selectedCauses.push(
                        item.value
                    );

                }
            );


            // ==================================
            // ORGANISATION DATA
            // ==================================

            const organisationData = {

                organisationName:
                    organisationName.value.trim(),

                organisationType:
                    organisationType.value,

                registrationNumber:
                    registrationNumber.value.trim(),

                yearEstablished:
                    yearEstablished &&
                    yearEstablished.value
                        ? Number(
                            yearEstablished.value
                        )
                        : null,

                contactPerson: {

                    name:
                        contactName.value.trim(),

                    designation:
                        designation
                            ? designation.value.trim()
                            : ""

                },

                email:
                    email.value
                        .trim()
                        .toLowerCase(),

                phone:
                    phone.value.trim(),

                location: {

                    address:
                        address.value.trim(),

                    city:
                        city.value.trim(),

                    state:
                        state.value.trim()

                },

                causes:
                    selectedCauses,

                description:
                    description.value.trim(),

                website:
                    website
                        ? website.value.trim()
                        : "",

                socialLink:
                    socialLink
                        ? socialLink.value.trim()
                        : "",

                password:
                    password.value

            };


            console.log(
                "Sending organisation:",
                organisationData
            );


            // ==================================
            // SEND TO BACKEND
            // ==================================

            try {

                const response =
                    await fetch(
                        "http://localhost:5000/api/organisations/auth/register",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    organisationData
                                )
                        }
                    );


                const data =
                    await response.json();


                // ==================================
                // BACKEND ERROR
                // ==================================

                if (!response.ok) {

                    console.error(
                        "Registration failed:",
                        data
                    );


                    if (
                        data.message ===
                        "Organisation with this email already exists"
                    ) {

                        emailError.textContent =
                            "An organisation with this email already exists.";

                        email.focus();

                        return;

                    }


                    if (
                        data.message ===
                        "Organisation registration number already exists"
                    ) {

                        registrationNumberError.textContent =
                            "This registration number is already registered.";

                        registrationNumber.focus();

                        return;

                    }


                    alert(
                        data.message ||
                        "Organisation registration failed."
                    );

                    return;

                }


                // ==================================
                // SUCCESS
                // ==================================

                console.log(
                    "Organisation registered:",
                    data.organisation
                );


                organisationForm.reset();


                if (
                    strengthIndicator &&
                    strengthText
                ) {

                    strengthIndicator.style.width =
                        "0";

                    strengthText.textContent =
                        "Password strength";

                }


                if (successModal) {

                    successModal.classList.add(
                        "show"
                    );

                } else {

                    alert(
                        "Organisation registration submitted successfully."
                    );

                    window.location.href =
                        "login.html";

                }

            }

            catch (error) {

                console.error(
                    "Organisation registration error:",
                    error
                );


                alert(
                    "Unable to connect to the KindLink server. Make sure the backend is running."
                );

            }

        }
    );

}


// ==========================================
// CLEAR ERRORS
// ==========================================

function clearErrors() {

    const errors = [

        organisationNameError,
        organisationTypeError,
        registrationNumberError,
        contactNameError,
        emailError,
        phoneError,
        addressError,
        cityError,
        stateError,
        descriptionError,
        passwordError,
        confirmPasswordError,
        documentError,
        termsError

    ];


    errors.forEach(
        function (errorElement) {

            if (errorElement) {

                errorElement.textContent =
                    "";

            }

        }
    );

}


// ==========================================
// CONTINUE TO LOGIN
// ==========================================

if (continueBtn) {

    continueBtn.addEventListener(
        "click",
        function () {

            window.location.href =
                "login.html";

        }
    );

}


// ==========================================
// MOBILE NAVIGATION
// ==========================================

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
// CLEAR ERRORS WHILE TYPING
// ==========================================

const fieldErrorPairs = [

    [organisationName, organisationNameError],
    [registrationNumber, registrationNumberError],
    [contactName, contactNameError],
    [email, emailError],
    [address, addressError],
    [city, cityError],
    [state, stateError],
    [description, descriptionError],
    [confirmPassword, confirmPasswordError]

];


fieldErrorPairs.forEach(
    function (pair) {

        const field =
            pair[0];

        const errorElement =
            pair[1];


        if (field && errorElement) {

            field.addEventListener(
                "input",
                function () {

                    errorElement.textContent =
                        "";

                }
            );

        }

    }
);


// ==========================================
// ORGANISATION TYPE ERROR
// ==========================================

if (
    organisationType &&
    organisationTypeError
) {

    organisationType.addEventListener(
        "change",
        function () {

            organisationTypeError.textContent =
                "";

        }
    );

}


// ==========================================
// DOCUMENT ERROR
// ==========================================

if (
    verificationDocument &&
    documentError
) {

    verificationDocument.addEventListener(
        "change",
        function () {

            documentError.textContent =
                "";

        }
    );

}


// ==========================================
// TERMS ERROR
// ==========================================

if (terms && termsError) {

    terms.addEventListener(
        "change",
        function () {

            termsError.textContent =
                "";

        }
    );

}