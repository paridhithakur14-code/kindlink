// ==========================================
// KINDLINK DONATION ROUTES
// ==========================================

const express =
    require("express");


const {

    createDonation,

    getMyDonations

} =
    require(
        "../controllers/donationController"
    );


const {
    protect
} =
    require(
        "../middleware/authMiddleware"
    );


const router =
    express.Router();


// ==========================================
// CREATE DONATION
// ==========================================

router.post(
    "/",
    protect,
    createDonation
);


// ==========================================
// USER DONATION HISTORY
// ==========================================

router.get(
    "/my",
    protect,
    getMyDonations
);


module.exports =
    router;