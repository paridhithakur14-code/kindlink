// ==========================================
// KINDLINK CAMPAIGN CONTROLLER
// ==========================================

const Campaign =
    require("../models/Campaign");


// ==========================================
// CREATE CAMPAIGN
// ORGANISATION ONLY
// ==========================================

const createCampaign =
    async (req, res) => {

        try {

            const {

                title,
                category,
                description,
                goalAmount,
                city,
                state,
                startDate,
                endDate,
                image

            } = req.body;


            // ==================================
            // VALIDATION
            // ==================================

            if (
                !title ||
                !category ||
                !description ||
                !goalAmount
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Please provide all required campaign details"

                });

            }


            // ==================================
            // VALIDATE GOAL
            // ==================================

            const parsedGoal =
                Number(goalAmount);


            if (
                !Number.isFinite(parsedGoal) ||
                parsedGoal <= 0
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Please provide a valid campaign goal amount"

                });

            }


            // ==================================
            // CREATE CAMPAIGN
            // ==================================

            const campaign =
                await Campaign.create({

                    organisation:
                        req.organisation._id,

                    title:
                        title.trim(),

                    category,

                    description:
                        description.trim(),

                    goalAmount:
                        parsedGoal,

                    location: {

                        city:
                            city
                                ? city.trim()
                                : "",

                        state:
                            state
                                ? state.trim()
                                : ""

                    },

                    startDate:
                        startDate ||
                        Date.now(),

                    endDate:
                        endDate ||
                        null,

                    image:
                        image
                            ? image.trim()
                            : ""

                });


            return res.status(201).json({

                success: true,

                message:
                    "Campaign created successfully",

                campaign

            });


        } catch (error) {

            console.error(
                "Create Campaign Error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Server error"

            });

        }

    };


// ==========================================
// GET ALL PUBLIC CAMPAIGNS
// ==========================================

const getCampaigns =
    async (req, res) => {

        try {

            const campaigns =
                await Campaign
                    .find({
                        status: "active"
                    })
                    .populate(
                        "organisation",
                        "organisationName verificationStatus"
                    )
                    .sort({
                        createdAt: -1
                    });


            return res.status(200).json({

                success: true,

                count:
                    campaigns.length,

                campaigns

            });


        } catch (error) {

            console.error(
                "Get Campaigns Error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Server error"

            });

        }

    };


// ==========================================
// GET SINGLE CAMPAIGN
// ==========================================

const getCampaignById =
    async (req, res) => {

        try {

            const campaign =
                await Campaign
                    .findById(
                        req.params.id
                    )
                    .populate(
                        "organisation",
                        "organisationName email phone verificationStatus"
                    );


            if (!campaign) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Campaign not found"

                });

            }


            return res.status(200).json({

                success: true,

                campaign

            });


        } catch (error) {

            console.error(
                "Get Campaign Error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Server error"

            });

        }

    };


// ==========================================
// GET LOGGED-IN ORGANISATION CAMPAIGNS
// ==========================================

const getOrganisationCampaigns =
    async (req, res) => {

        try {

            const campaigns =
                await Campaign
                    .find({

                        organisation:
                            req.organisation._id

                    })
                    .sort({

                        createdAt: -1

                    });


            return res.status(200).json({

                success: true,

                count:
                    campaigns.length,

                campaigns

            });


        } catch (error) {

            console.error(
                "Organisation Campaign Error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Server error"

            });

        }

    };


module.exports = {

    createCampaign,

    getCampaigns,

    getCampaignById,

    getOrganisationCampaigns

};