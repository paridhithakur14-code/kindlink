// ==========================================
// KINDLINK ORGANISATION AUTH ROUTES
// ==========================================

const express = require("express");

const router = express.Router();


const {
    registerOrganisation,
    loginOrganisation,
    getOrganisationProfile
} = require(
    "../controllers/organisationAuthController"
);


const {
    protectOrganisation
} = require(
    "../middleware/organisationAuthMiddleware"
);


// ==========================================
// REGISTER
// POST /api/organisations/auth/register
// ==========================================

router.post(
    "/register",
    registerOrganisation
);


// ==========================================
// LOGIN
// POST /api/organisations/auth/login
// ==========================================

router.post(
    "/login",
    loginOrganisation
);


// ==========================================
// PROFILE - PROTECTED
// GET /api/organisations/auth/profile
// ==========================================

router.get(
    "/profile",
    protectOrganisation,
    getOrganisationProfile
);


module.exports = router;