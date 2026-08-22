// =======================================
// KINDLINK LOGIN PAGE
// =======================================


// =======================================
// DOM ELEMENTS
// =======================================

const userBtn = document.getElementById("userBtn");
const organisationBtn = document.getElementById("organisationBtn");

const accountType = document.getElementById("accountType");

const registerBtn = document.getElementById("registerBtn");
const registerText = document.getElementById("registerText");

const loginForm = document.getElementById("loginForm");

const email = document.getElementById("email");
const password = document.getElementById("password");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

const showPassword = document.getElementById("showPassword");

const toast = document.getElementById("toast");
const toastTitle = document.getElementById("toastTitle");
const toastMessage = document.getElementById("toastMessage");

const forgotPassword = document.getElementById("forgotPassword");

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");


// =======================================
// ACCOUNT TYPE - USER
// =======================================

userBtn.addEventListener("click", () => {

    accountType.value = "user";

    userBtn.classList.add("active");
    organisationBtn.classList.remove("active");

    registerText.textContent =
        "Create your account and start making an impact.";

    registerBtn.textContent =
        "Create User Account";

    registerBtn.href =
        "user-register.html";

});


// =======================================
// ACCOUNT TYPE - ORGANISATION
// =======================================

organisationBtn.addEventListener("click", () => {

    accountType.value = "organisation";

    organisationBtn.classList.add("active");
    userBtn.classList.remove("active");

    registerText.textContent =
        "Register your organisation and connect with supporters.";

    registerBtn.textContent =
        "Register Organisation";

    registerBtn.href =
        "organisation-register.html";

});


// =======================================
// SHOW / HIDE PASSWORD
// =======================================

showPassword.addEventListener("click", () => {

    const icon =
        showPassword.querySelector("i");


    if (password.type === "password") {

        password.type = "text";

        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");

    } else {

        password.type = "password";

        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");

    }

});


// =======================================
// EMAIL VALIDATION
// =======================================

function validateEmail(emailValue) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(emailValue);

}


// =======================================
// LOGIN FORM
// =======================================

loginForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        // Clear old errors

        emailError.textContent = "";
        passwordError.textContent = "";


        let valid = true;


        // ===================================
        // EMAIL VALIDATION
        // ===================================

        if (email.value.trim() === "") {

            emailError.textContent =
                "Please enter your email address.";

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


        // ===================================
        // PASSWORD VALIDATION
        // ===================================

        if (password.value.trim() === "") {

            passwordError.textContent =
                "Please enter your password.";

            valid = false;

        }

        else if (
            password.value.length < 6
        ) {

            passwordError.textContent =
                "Password must contain at least 6 characters.";

            valid = false;

        }


        if (!valid) {
            return;
        }


        const selectedAccount =
            accountType.value;


        // ===================================
        // SELECT CORRECT LOGIN API
        // ===================================

        let loginURL;


        if (selectedAccount === "user") {

            loginURL =
                "http://localhost:5000/api/auth/login";

        }

        else if (
            selectedAccount === "organisation"
        ) {

            loginURL =
                "http://localhost:5000/api/organisations/auth/login";

        }

        else {

            showToast(
                "Login Error",
                "Please select an account type."
            );

            return;

        }


        // ===================================
        // SEND LOGIN REQUEST
        // ===================================

        try {

            const response =
                await fetch(
                    loginURL,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            email:
                                email.value
                                    .trim()
                                    .toLowerCase(),

                            password:
                                password.value

                        })
                    }
                );


            const data =
                await response.json();


            // ===================================
            // LOGIN FAILED
            // ===================================

            if (!response.ok) {

                showToast(
                    "Login Failed",

                    data.message ||
                    "Invalid email or password."
                );

                return;

            }


            // ===================================
            // USER LOGIN SUCCESS
            // ===================================

            if (selectedAccount === "user") {

                // Remove old organisation data

                localStorage.removeItem(
                    "kindlinkOrganisation"
                );


                // Save JWT

                localStorage.setItem(
                    "kindlinkToken",
                    data.token
                );


                // Save user information

                localStorage.setItem(
                    "kindlinkUser",
                    JSON.stringify(
                        data.user
                    )
                );


                // Save account type

                localStorage.setItem(
                    "kindlinkAccountType",
                    "user"
                );


                showToast(
                    "Login Successful",
                    "Opening your KindLink user dashboard..."
                );


                setTimeout(
                    function () {

                        window.location.href =
                            "user-dashboard.html";

                    },
                    1200
                );

            }


            // ===================================
            // ORGANISATION LOGIN SUCCESS
            // ===================================

            else {

                // Remove old user data

                localStorage.removeItem(
                    "kindlinkUser"
                );


                // Save organisation JWT

                localStorage.setItem(
                    "kindlinkToken",
                    data.token
                );


                // Save organisation information

                localStorage.setItem(
                    "kindlinkOrganisation",
                    JSON.stringify(
                        data.organisation
                    )
                );


                // Save account type

                localStorage.setItem(
                    "kindlinkAccountType",
                    "organisation"
                );


                // ===================================
                // VERIFICATION STATUS
                // ===================================

                if (
                    data.organisation
                        .verificationStatus ===
                    "pending"
                ) {

                    showToast(
                        "Login Successful",
                        "Your organisation verification is currently pending."
                    );

                }

                else if (
                    data.organisation
                        .verificationStatus ===
                    "verified"
                ) {

                    showToast(
                        "Login Successful",
                        "Opening your organisation dashboard..."
                    );

                }

                else {

                    showToast(
                        "Login Successful",
                        "Opening your organisation dashboard..."
                    );

                }


                // ===================================
                // REDIRECT
                // ===================================

                setTimeout(
                    function () {

                        window.location.href =
                            "organisation-dashboard.html";

                    },
                    1500
                );

            }

        }

        catch (error) {

            console.error(
                "KindLink Login Error:",
                error
            );


            showToast(
                "Connection Error",
                "Unable to connect to the KindLink server."
            );

        }

    }
);


// =======================================
// TOAST
// =======================================

function showToast(title, message) {

    toastTitle.textContent =
        title;

    toastMessage.textContent =
        message;

    toast.classList.add(
        "show"
    );


    setTimeout(
        function () {

            toast.classList.remove(
                "show"
            );

        },
        3000
    );

}


// =======================================
// FORGOT PASSWORD
// =======================================

forgotPassword.addEventListener(
    "click",
    function (event) {

        event.preventDefault();


        showToast(
            "Coming Soon",
            "Password recovery will be connected during backend development."
        );

    }
);


// =======================================
// MOBILE NAVIGATION
// =======================================

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


// =======================================
// CLEAR EMAIL ERROR
// =======================================

email.addEventListener(
    "input",
    function () {

        emailError.textContent =
            "";

    }
);


// =======================================
// CLEAR PASSWORD ERROR
// =======================================

password.addEventListener(
    "input",
    function () {

        passwordError.textContent =
            "";

    }
);