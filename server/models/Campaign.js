// ==========================================
// KINDLINK CAMPAIGN MODEL
// ==========================================

const mongoose = require("mongoose");


const campaignSchema =
    new mongoose.Schema(

        {

            // Organisation that created campaign

            organisation: {

                type:
                    mongoose.Schema.Types.ObjectId,

                ref:
                    "Organisation",

                required:
                    true

            },


            // ==================================
            // BASIC INFORMATION
            // ==================================

            title: {

                type:
                    String,

                required:
                    true,

                trim:
                    true

            },


            category: {

                type:
                    String,

                required:
                    true,

                enum: [

                    "Education",
                    "Healthcare",
                    "Environment",
                    "Animals",
                    "Community",
                    "Women Empowerment",
                    "Child Welfare",
                    "Disaster Relief",
                    "Other"

                ]

            },


            description: {

                type:
                    String,

                required:
                    true,

                trim:
                    true

            },


            // ==================================
            // FUNDING
            // ==================================

            goalAmount: {

                type:
                    Number,

                required:
                    true,

                min:
                    1

            },


            amountRaised: {

                type:
                    Number,

                default:
                    0,

                min:
                    0

            },


            // ==================================
            // LOCATION
            // ==================================

            location: {

                city: {

                    type:
                        String,

                    trim:
                        true

                },

                state: {

                    type:
                        String,

                    trim:
                        true

                }

            },


            // ==================================
            // CAMPAIGN DATES
            // ==================================

            startDate: {

                type:
                    Date,

                default:
                    Date.now

            },


            endDate: {

                type:
                    Date

            },


            // ==================================
            // IMAGE
            // ==================================

            image: {

                type:
                    String,

                default:
                    ""

            },


            // ==================================
            // CAMPAIGN STATUS
            // ==================================

            status: {

                type:
                    String,

                enum: [
                    "active",
                    "completed",
                    "paused"
                ],

                default:
                    "active"

            }

        },


        {
            timestamps: true
        }

    );


module.exports =
    mongoose.model(
        "Campaign",
        campaignSchema
    );