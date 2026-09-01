// ==========================================
// KINDLINK VOLUNTEER OPPORTUNITY MODEL
// ==========================================

const mongoose =
    require("mongoose");


const volunteerOpportunitySchema =
    new mongoose.Schema(
        {

            // ==================================
            // ORGANISATION
            // ==================================

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

                    "education",
                    "animals",
                    "environment",
                    "community",
                    "emergency",
                    "other"

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
            // LOCATION
            // ==================================

            location: {

                city: {

                    type:
                        String,

                    trim:
                        true,

                    default:
                        ""

                },


                state: {

                    type:
                        String,

                    trim:
                        true,

                    default:
                        ""

                },


                mode: {

                    type:
                        String,

                    enum: [

                        "onsite",
                        "online",
                        "hybrid"

                    ],

                    default:
                        "onsite"

                }

            },


            // ==================================
            // VOLUNTEER DETAILS
            // ==================================

            schedule: {

                type:
                    String,

                trim:
                    true,

                default:
                    "Flexible"

            },


            requiredSkills: {

                type:
                    [String],

                default:
                    []

            },


            slots: {

                type:
                    Number,

                default:
                    1,

                min:
                    1

            },


            // ==================================
            // FLAGS
            // ==================================

            isUrgent: {

                type:
                    Boolean,

                default:
                    false

            },


            image: {

                type:
                    String,

                trim:
                    true,

                default:
                    ""

            },


            // ==================================
            // STATUS
            // ==================================

            status: {

                type:
                    String,

                enum: [

                    "active",
                    "closed"

                ],

                default:
                    "active"

            }

        },

        {

            timestamps:
                true

        }

    );


// ==========================================
// INDEXES
// ==========================================

volunteerOpportunitySchema.index({

    organisation:
        1,

    createdAt:
        -1

});


volunteerOpportunitySchema.index({

    status:
        1,

    createdAt:
        -1

});


// ==========================================
// MODEL
// ==========================================

const VolunteerOpportunity =
    mongoose.model(

        "VolunteerOpportunity",

        volunteerOpportunitySchema

    );


module.exports =
    VolunteerOpportunity;