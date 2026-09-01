// ==========================================
// KINDLINK VOLUNTEER ROUTES
// ==========================================

const express =
    require("express");


const router =
    express.Router();


// ==========================================
// CONTROLLERS
// ==========================================

const {

    createVolunteerOpportunity,

    getVolunteerOpportunities,

    getVolunteerOpportunityById,

    getOrganisationVolunteerOpportunities,

    applyForVolunteerOpportunity,

    getMyVolunteerApplications,

    getOrganisationVolunteerApplications,

    updateVolunteerApplicationStatus

} =
    require(
        "../controllers/volunteerController"
    );


// ==========================================
// USER AUTH
// ==========================================

const {

    protect

} =
    require(
        "../middleware/authMiddleware"
    );


// ==========================================
// ORGANISATION AUTH
// ==========================================

const {

    protectOrganisation

} =
    require(
        "../middleware/organisationAuthMiddleware"
    );


// ==========================================
// PUBLIC
// GET ALL OPPORTUNITIES
// ==========================================

router.get(

    "/",

    getVolunteerOpportunities

);


// ==========================================
// USER
// GET MY APPLICATIONS
//
// IMPORTANT:
// Keep before /:id
// ==========================================

router.get(

    "/applications/mine",

    protect,

    getMyVolunteerApplications

);


// ==========================================
// ORGANISATION
// GET ITS OWN OPPORTUNITIES
// ==========================================

router.get(

    "/organisation/mine",

    protectOrganisation,

    getOrganisationVolunteerOpportunities

);


// ==========================================
// ORGANISATION
// GET RECEIVED APPLICATIONS
// ==========================================

router.get(

    "/organisation/applications",

    protectOrganisation,

    getOrganisationVolunteerApplications

);


// ==========================================
// ORGANISATION
// CREATE OPPORTUNITY
// ==========================================

router.post(

    "/",

    protectOrganisation,

    createVolunteerOpportunity

);


// ==========================================
// ORGANISATION
// ACCEPT / REJECT APPLICATION
// ==========================================

router.patch(

    "/applications/:applicationId/status",

    protectOrganisation,

    updateVolunteerApplicationStatus

);


// ==========================================
// USER
// APPLY FOR OPPORTUNITY
// ==========================================

router.post(

    "/:id/apply",

    protect,

    applyForVolunteerOpportunity

);


// ==========================================
// PUBLIC
// GET SINGLE OPPORTUNITY
//
// KEEP LAST
// ==========================================

router.get(

    "/:id",

    getVolunteerOpportunityById

);


// ==========================================
// EXPORT
// ==========================================

module.exports =
    router;