// ==========================================
// KINDLINK DONATION CONTROLLER
// ==========================================

const Donation =
    require("../models/Donation");

const Campaign =
    require("../models/Campaign");


// ==========================================
// CREATE DONATION
// POST /api/donations
// ==========================================

const createDonation =
    async (req, res) => {

        try {

            const {
                campaignId,
                amount
            } = req.body;


            // ==================================
            // VALIDATION
            // ==================================

            if (!campaignId) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Campaign ID is required"

                });

            }


            const donationAmount =
                Number(amount);


            if (
                !donationAmount ||
                donationAmount <= 0
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Please enter a valid donation amount"

                });

            }


            // ==================================
            // FIND CAMPAIGN
            // ==================================

            const campaign =
                await Campaign.findById(
                    campaignId
                );


            if (!campaign) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Campaign not found"

                });

            }


            // ==================================
            // CAMPAIGN MUST BE ACTIVE
            // ==================================

            if (
                campaign.status !== "active"
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "This campaign is not currently accepting donations"

                });

            }


            // ==================================
            // GENERATE DEMO TRANSACTION ID
            // ==================================

            const transactionId =
                `KL-${Date.now()}-${Math.floor(
                    1000 +
                    Math.random() * 9000
                )}`;


            // ==================================
            // CREATE DONATION
            // ==================================

            const donation =
                await Donation.create({

                    user:
                        req.user._id,

                    campaign:
                        campaign._id,

                    organisation:
                        campaign.organisation,

                    amount:
                        donationAmount,

                    paymentMethod:
                        "demo",

                    status:
                        "completed",

                    transactionId

                });


            // ==================================
            // UPDATE CAMPAIGN AMOUNT
            // ==================================

            try {

                await Campaign.findByIdAndUpdate(

                    campaign._id,

                    {
                        $inc: {
                            amountRaised:
                                donationAmount
                        }
                    },

                    {
                        new: true,
                        runValidators: true
                    }

                );

            } catch (campaignUpdateError) {

                // Remove donation if campaign
                // update failed

                await Donation.findByIdAndDelete(
                    donation._id
                );


                throw campaignUpdateError;

            }


            // ==================================
            // POPULATE DONATION
            // ==================================

            const savedDonation =
                await Donation
                    .findById(
                        donation._id
                    )
                    .populate(
                        "campaign",
                        "title category goalAmount amountRaised"
                    )
                    .populate(
                        "organisation",
                        "organisationName"
                    );


            // ==================================
            // RESPONSE
            // ==================================

            return res.status(201).json({

                success: true,

                message:
                    "Donation completed successfully",

                donation:
                    savedDonation

            });


        } catch (error) {

            console.error(
                "Create Donation Error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Unable to process donation"

            });

        }

    };


// ==========================================
// GET LOGGED-IN USER DONATIONS
// GET /api/donations/my
// ==========================================

const getMyDonations =
    async (req, res) => {

        try {

            const donations =
                await Donation
                    .find({

                        user:
                            req.user._id

                    })
                    .populate(
                        "campaign",
                        "title category goalAmount amountRaised"
                    )
                    .populate(
                        "organisation",
                        "organisationName"
                    )
                    .sort({
                        createdAt: -1
                    });


            // ==================================
            // TOTAL DONATED
            // ==================================

            const totalDonated =
                donations.reduce(
                    (
                        total,
                        donation
                    ) => {

                        if (
                            donation.status ===
                            "completed"
                        ) {

                            return (
                                total +
                                Number(
                                    donation.amount
                                )
                            );

                        }


                        return total;

                    },
                    0
                );


            // ==================================
            // UNIQUE CAMPAIGNS SUPPORTED
            // ==================================

            const campaignIds =
                new Set();


            donations.forEach(
                donation => {

                    if (
                        donation.campaign
                    ) {

                        campaignIds.add(
                            String(
                                donation
                                    .campaign
                                    ._id
                            )
                        );

                    }

                }
            );


            return res.status(200).json({

                success: true,

                count:
                    donations.length,

                summary: {

                    totalDonated,

                    campaignsSupported:
                        campaignIds.size

                },

                donations

            });


        } catch (error) {

            console.error(
                "Get Donations Error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Unable to load donations"

            });

        }

    };


// ==========================================
// EXPORT
// ==========================================

module.exports = {

    createDonation,

    getMyDonations

};