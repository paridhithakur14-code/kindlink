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
// ACCOUNT TYPE
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

    const icon = showPassword.querySelector("i");

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

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    emailError.textContent = "";
    passwordError.textContent = "";

    let valid = true;


    // =======================================
    // EMAIL VALIDATION
    // =======================================

    if (email.value.trim() === "") {

        emailError.textContent =
            "Please enter your email address.";

        valid = false;

    } else if (!validateEmail(email.value.trim())) {

        emailError.textContent =
            "Please enter a valid email address.";

        valid = false;
    }


    // =======================================
    // PASSWORD VALIDATION
    // =======================================

    if (password.value.trim() === "") {

        passwordError.textContent =
            "Please enter your password.";

        valid = false;

    } else if (password.value.length < 6) {

        passwordError.textContent =
            "Password must contain at least 6 characters.";

        valid = false;
    }


    if (!valid) {
        return;
    }


    const selectedAccount = accountType.value;


    // =======================================
    // USER LOGIN
    // =======================================

    if (selectedAccount === "user") {

        try {

            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email.value.trim(),
                        password: password.value
                    })
                }
            );


            const data = await response.json();


            // =======================================
            // LOGIN FAILED
            // =======================================

            if (!response.ok) {

                showToast(
                    "Login Failed",
                    data.message || "Invalid email or password."
                );

                return;
            }


            // =======================================
            // SAVE LOGIN DATA
            // =======================================

            localStorage.setItem(
                "kindlinkToken",
                data.token
            );


            localStorage.setItem(
                "kindlinkUser",
                JSON.stringify(data.user)
            );


            // Remember account type

            localStorage.setItem(
                "kindlinkAccountType",
                "user"
            );


            showToast(
                "Login Successful",
                "Opening your KindLink dashboard..."
            );


            // =======================================
            // REDIRECT
            // =======================================

            setTimeout(() => {

                window.location.href =
                    "user-dashboard.html";

            }, 1200);


        } catch (error) {

            console.error(
                "Login error:",
                error
            );


            showToast(
                "Connection Error",
                "Unable to connect to the KindLink server."
            );
        }


    }


    // =======================================
    // ORGANISATION LOGIN
    // =======================================

    else {

        showToast(
            "Organisation Login",
            "Organisation backend login will be connected next."
        );

    }

});


// =======================================
// TOAST
// =======================================

function showToast(title, message) {

    toastTitle.textContent = title;
    toastMessage.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);
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

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


// =======================================
// CLEAR ERRORS WHILE TYPING
// =======================================

email.addEventListener("input", () => {

    emailError.textContent = "";

});


password.addEventListener("input", () => {

    passwordError.textContent = "";

});