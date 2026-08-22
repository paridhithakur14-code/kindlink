// ==========================================
// KINDLINK DONATION PAGE
// ==========================================


// ==========================================
// MOBILE NAVIGATION
// ==========================================

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.querySelector(".nav-links");


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
// ELEMENTS
// ==========================================

const donationForm =
    document.getElementById("donationForm");

const amountButtons =
    document.querySelectorAll(".amount-btn");

const customAmount =
    document.getElementById("customAmount");

const summaryAmount =
    document.getElementById("summaryAmount");

const summaryTotal =
    document.getElementById("summaryTotal");

const summaryCampaign =
    document.getElementById("summaryCampaign");

const summaryOrganisation =
    document.getElementById("summaryOrganisation");

const campaignInputs =
    document.querySelectorAll(
        'input[name="campaign"]'
    );


let selectedAmount = 500;


// ==========================================
// FORMAT CURRENCY
// ==========================================

function formatCurrency(amount) {

    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }
    ).format(amount);

}


// ==========================================
// UPDATE AMOUNT
// ==========================================

function updateAmount(amount) {

    selectedAmount =
        Number(amount);

    summaryAmount.textContent =
        formatCurrency(selectedAmount);

    summaryTotal.textContent =
        formatCurrency(selectedAmount);

}


// ==========================================
// PRESET AMOUNTS
// ==========================================

amountButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                amountButtons.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                customAmount.value = "";


                updateAmount(
                    button.dataset.amount
                );


                document
                    .getElementById(
                        "amountError"
                    )
                    .textContent = "";

            }
        );

    }
);


// ==========================================
// CUSTOM AMOUNT
// ==========================================

customAmount.addEventListener(
    "input",
    function () {

        amountButtons.forEach(
            function (button) {

                button.classList.remove(
                    "active"
                );

            }
        );


        if (
            Number(customAmount.value) > 0
        ) {

            updateAmount(
                customAmount.value
            );

        }

    }
);


// ==========================================
// CAMPAIGN SELECTION
// ==========================================

campaignInputs.forEach(
    function (campaign) {

        campaign.addEventListener(
            "change",
            function () {

                summaryCampaign.textContent =
                    campaign.dataset.title;

                summaryOrganisation.textContent =
                    campaign.dataset.organisation;

            }
        );

    }
);


// ==========================================
// PHONE INPUT
// ==========================================

const donorPhone =
    document.getElementById("donorPhone");


donorPhone.addEventListener(
    "input",
    function () {

        donorPhone.value =
            donorPhone.value.replace(
                /\D/g,
                ""
            );

        document
            .getElementById(
                "phoneError"
            )
            .textContent = "";

    }
);


// ==========================================
// VALIDATE EMAIL
// ==========================================

function validateEmail(value) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(value);

}


// ==========================================
// FORM SUBMISSION
// ==========================================

donationForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const donorName =
            document.getElementById(
                "donorName"
            );

        const donorEmail =
            document.getElementById(
                "donorEmail"
            );

        const terms =
            document.getElementById(
                "donationTerms"
            );


        const nameError =
            document.getElementById(
                "nameError"
            );

        const emailError =
            document.getElementById(
                "emailError"
            );

        const phoneError =
            document.getElementById(
                "phoneError"
            );

        const amountError =
            document.getElementById(
                "amountError"
            );

        const termsError =
            document.getElementById(
                "termsError"
            );


        nameError.textContent = "";
        emailError.textContent = "";
        phoneError.textContent = "";
        amountError.textContent = "";
        termsError.textContent = "";


        let valid = true;


        // NAME

        if (
            donorName.value.trim() === ""
        ) {

            nameError.textContent =
                "Please enter your name.";

            valid = false;

        }


        // EMAIL

        if (
            donorEmail.value.trim() === ""
        ) {

            emailError.textContent =
                "Please enter your email.";

            valid = false;

        }

        else if (
            !validateEmail(
                donorEmail.value.trim()
            )
        ) {

            emailError.textContent =
                "Please enter a valid email.";

            valid = false;

        }


        // PHONE

        if (
            donorPhone.value !== "" &&
            donorPhone.value.length !== 10
        ) {

            phoneError.textContent =
                "Phone number must contain 10 digits.";

            valid = false;

        }


        // AMOUNT

        if (
            !selectedAmount ||
            selectedAmount <= 0
        ) {

            amountError.textContent =
                "Please enter a valid donation amount.";

            valid = false;

        }


        // TERMS

        if (!terms.checked) {

            termsError.textContent =
                "Please accept the donation terms.";

            valid = false;

        }


        if (!valid) {

            return;

        }


        // ======================================
        // SELECTED CAMPAIGN
        // ======================================

        const selectedCampaign =
            document.querySelector(
                'input[name="campaign"]:checked'
            );


        const selectedPayment =
            document.querySelector(
                'input[name="payment"]:checked'
            );


        const anonymous =
            document
                .getElementById(
                    "anonymousDonation"
                )
                .checked;


        // ======================================
        // DONATION OBJECT
        // ======================================

        const donationData = {

            donor: {

                name:
                    donorName.value.trim(),

                email:
                    donorEmail.value.trim(),

                phone:
                    donorPhone.value.trim(),

                anonymous:
                    anonymous

            },

            campaign: {

                id:
                    selectedCampaign.value,

                title:
                    selectedCampaign
                        .dataset
                        .title,

                organisation:
                    selectedCampaign
                        .dataset
                        .organisation

            },

            amount:
                selectedAmount,

            paymentMethod:
                selectedPayment.value,

            status:
                "demo-completed"

        };


        console.log(
            "KindLink Demo Donation:",
            donationData
        );


        /*
        =======================================

        BACKEND PHASE

        Later this becomes something like:

        POST /api/donations/create

        Payment gateway flow:

        Frontend
            ↓
        KindLink Backend
            ↓
        Razorpay / Stripe
            ↓
        Payment Verification
            ↓
        MongoDB Donation Record

        IMPORTANT:
        Raw card data should NOT be handled
        by our own JavaScript or database.

        =======================================
        */


        showSuccessModal(
            donationData
        );

    }
);


// ==========================================
// SUCCESS MODAL
// ==========================================

const successModal =
    document.getElementById(
        "successModal"
    );

const closeModal =
    document.getElementById(
        "closeModal"
    );


function showSuccessModal(data) {

    document
        .getElementById(
            "receiptCampaign"
        )
        .textContent =
            data.campaign.title;


    document
        .getElementById(
            "receiptAmount"
        )
        .textContent =
            formatCurrency(
                data.amount
            );


    const paymentNames = {

        upi:
            "UPI (Demo)",

        card:
            "Card (Demo)",

        netbanking:
            "Net Banking (Demo)"

    };


    document
        .getElementById(
            "receiptPayment"
        )
        .textContent =
            paymentNames[
                data.paymentMethod
            ];


    successModal.classList.add(
        "show"
    );

}


// ==========================================
// CLOSE MODAL
// ==========================================

closeModal.addEventListener(
    "click",
    function () {

        successModal.classList.remove(
            "show"
        );

        window.location.href =
            "causes.html";

    }
);


// ==========================================
// CLEAR ERRORS WHILE TYPING
// ==========================================

document
    .getElementById("donorName")
    .addEventListener(
        "input",
        function () {

            document
                .getElementById(
                    "nameError"
                )
                .textContent = "";

        }
    );


document
    .getElementById("donorEmail")
    .addEventListener(
        "input",
        function () {

            document
                .getElementById(
                    "emailError"
                )
                .textContent = "";

        }
    );


document
    .getElementById("donationTerms")
    .addEventListener(
        "change",
        function () {

            document
                .getElementById(
                    "termsError"
                )
                .textContent = "";

        }
    );