// ==========================================
// KINDLINK CAMPAIGN ROUTES
// ==========================================

const express =
    require("express");

const router =
    express.Router();


const {

    createCampaign,
    getCampaigns,
    getCampaignById,
    getOrganisationCampaigns

} =
    require(
        "../controllers/campaignController"
    );


const {
    protectOrganisation
} =
    require(
        "../middleware/organisationAuthMiddleware"
    );


// ==========================================
// PUBLIC
// GET ALL ACTIVE CAMPAIGNS
// ==========================================

router.get(
    "/",
    getCampaigns
);


// ==========================================
// ORGANISATION
// GET ITS OWN CAMPAIGNS
// IMPORTANT: keep before /:id
// ==========================================

router.get(
    "/organisation/mine",
    protectOrganisation,
    getOrganisationCampaigns
);


// ==========================================
// ORGANISATION
// CREATE CAMPAIGN
// ==========================================

router.post(
    "/",
    protectOrganisation,
    createCampaign
);


// ==========================================
// PUBLIC
// GET SINGLE CAMPAIGN
// ==========================================

router.get(
    "/:id",
    getCampaignById
);


module.exports =
    router;