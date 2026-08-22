// ==========================================
// KINDLINK USER REGISTRATION
// ==========================================


// -----------------------------
// ELEMENTS
// -----------------------------

const registerForm =
    document.getElementById("registerForm");

const firstName =
    document.getElementById("firstName");

const lastName =
    document.getElementById("lastName");

const email =
    document.getElementById("email");

const phone =
    document.getElementById("phone");

const password =
    document.getElementById("password");

const confirmPassword =
    document.getElementById("confirmPassword");

const terms =
    document.getElementById("terms");


const firstNameError =
    document.getElementById("firstNameError");

const lastNameError =
    document.getElementById("lastNameError");

const emailError =
    document.getElementById("emailError");

const phoneError =
    document.getElementById("phoneError");

const passwordError =
    document.getElementById("passwordError");

const confirmPasswordError =
    document.getElementById("confirmPasswordError");

const termsError =
    document.getElementById("termsError");


const togglePassword =
    document.getElementById("togglePassword");

const strengthIndicator =
    document.getElementById("strengthIndicator");

const strengthText =
    document.getElementById("strengthText");

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
// NAME VALIDATION
// ==========================================

function validateName(value) {

    const pattern =
        /^[A-Za-z ]{2,}$/;

    return pattern.test(value);

}


// ==========================================
// PHONE NUMBER
// ==========================================

phone.addEventListener("input", function () {

    this.value =
        this.value.replace(/\D/g, "");

    phoneError.textContent = "";

});


// ==========================================
// PASSWORD SHOW / HIDE
// ==========================================

togglePassword.addEventListener("click", function () {

    const icon =
        togglePassword.querySelector("i");


    if (password.type === "password") {

        password.type = "text";

        icon.classList.remove("fa-eye");

        icon.classList.add("fa-eye-slash");

    }

    else {

        password.type = "password";

        icon.classList.remove("fa-eye-slash");

        icon.classList.add("fa-eye");

    }

});


// ==========================================
// PASSWORD STRENGTH
// ==========================================

password.addEventListener("input", function () {

    const value = password.value;

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


    updateStrength(strength);

});


function updateStrength(strength) {

    if (password.value.length === 0) {

        strengthIndicator.style.width = "0";

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


    else if (strength >= 4) {

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

registerForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        clearErrors();


        let valid = true;


        // -----------------------------
        // FIRST NAME
        // -----------------------------

        if (firstName.value.trim() === "") {

            firstNameError.textContent =
                "Please enter your first name.";

            valid = false;

        }

        else if (
            !validateName(firstName.value.trim())
        ) {

            firstNameError.textContent =
                "Please enter a valid name.";

            valid = false;

        }


        // -----------------------------
        // LAST NAME
        // -----------------------------

        if (lastName.value.trim() === "") {

            lastNameError.textContent =
                "Please enter your last name.";

            valid = false;

        }

        else if (
            !validateName(lastName.value.trim())
        ) {

            lastNameError.textContent =
                "Please enter a valid name.";

            valid = false;

        }


        // -----------------------------
        // EMAIL
        // -----------------------------

        if (email.value.trim() === "") {

            emailError.textContent =
                "Please enter your email.";

            valid = false;

        }

        else if (
            !validateEmail(email.value.trim())
        ) {

            emailError.textContent =
                "Please enter a valid email address.";

            valid = false;

        }


        // -----------------------------
        // PHONE
        // -----------------------------

        if (phone.value.trim() === "") {

            phoneError.textContent =
                "Please enter your mobile number.";

            valid = false;

        }

        else if (
            phone.value.length !== 10
        ) {

            phoneError.textContent =
                "Mobile number must contain 10 digits.";

            valid = false;

        }


        // -----------------------------
        // PASSWORD
        // -----------------------------

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


        // -----------------------------
        // CONFIRM PASSWORD
        // -----------------------------

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


        // -----------------------------
        // TERMS
        // -----------------------------

        if (!terms.checked) {

            termsError.textContent =
                "You must accept the terms and conditions.";

            valid = false;

        }


        // -----------------------------
        // STOP IF INVALID
        // -----------------------------

        if (!valid) {

            return;

        }


        // =================================
        // GET USER INTERESTS
        // =================================

        const selectedInterests = [];

        const interestInputs =
            document.querySelectorAll(
                'input[name="interest"]:checked'
            );


        interestInputs.forEach(function (item) {

            selectedInterests.push(
                item.value
            );

        });


        // =================================
        // USER OBJECT
        // =================================

        const newUser = {

            firstName:
                firstName.value.trim(),

            lastName:
                lastName.value.trim(),

            email:
                email.value.trim(),

            phone:
                phone.value.trim(),

            city:
                document
                    .getElementById("city")
                    .value
                    .trim(),

            interests:
                selectedInterests

        };


        console.log(
            "KindLink User Registration:",
            newUser
        );


        /*
        ====================================

        IMPORTANT

        We intentionally DO NOT save
        passwords to localStorage.

        Later Phase 3 will send this data
        securely to:

        POST /api/auth/register/user

        Node.js + Express + MongoDB

        ====================================
        */


        successModal.classList.add("show");

    }
);


// ==========================================
// CLEAR ERRORS
// ==========================================

function clearErrors() {

    firstNameError.textContent = "";

    lastNameError.textContent = "";

    emailError.textContent = "";

    phoneError.textContent = "";

    passwordError.textContent = "";

    confirmPasswordError.textContent = "";

    termsError.textContent = "";

}


// ==========================================
// CONTINUE LOGIN
// ==========================================

continueBtn.addEventListener(
    "click",
    function () {

        window.location.href =
            "login.html";

    }
);


// ==========================================
// MOBILE MENU
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
// REMOVE ERROR WHILE TYPING
// ==========================================

firstName.addEventListener(
    "input",
    function () {

        firstNameError.textContent = "";

    }
);


lastName.addEventListener(
    "input",
    function () {

        lastNameError.textContent = "";

    }
);


email.addEventListener(
    "input",
    function () {

        emailError.textContent = "";

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