// ==========================================
// KINDLINK VOLUNTEER APPLICATION MODEL
// ==========================================

const mongoose =
    require("mongoose");


const volunteerApplicationSchema =
    new mongoose.Schema(
        {

            // ==================================
            // OPPORTUNITY
            // ==================================

            opportunity: {

                type:
                    mongoose.Schema.Types.ObjectId,

                ref:
                    "VolunteerOpportunity",

                required:
                    true

            },


            // ==================================
            // USER
            // ==================================

            user: {

                type:
                    mongoose.Schema.Types.ObjectId,

                ref:
                    "User",

                required:
                    true

            },


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
            // APPLICANT DETAILS
            // ==================================

            name: {

                type:
                    String,

                required:
                    true,

                trim:
                    true

            },


            age: {

                type:
                    Number,

                required:
                    true,

                min:
                    16,

                max:
                    80

            },


            email: {

                type:
                    String,

                required:
                    true,

                lowercase:
                    true,

                trim:
                    true

            },


            phone: {

                type:
                    String,

                required:
                    true,

                trim:
                    true

            },


            skills: {

                type:
                    String,

                trim:
                    true,

                default:
                    ""

            },


            message: {

                type:
                    String,

                trim:
                    true,

                default:
                    ""

            },


            // ==================================
            // APPLICATION STATUS
            // ==================================

            status: {

                type:
                    String,

                enum: [

                    "pending",
                    "accepted",
                    "rejected"

                ],

                default:
                    "pending"

            },


            reviewedAt: {

                type:
                    Date,

                default:
                    null

            }

        },

        {

            timestamps:
                true

        }

    );


// ==========================================
// PREVENT DUPLICATE APPLICATION
// ==========================================

volunteerApplicationSchema.index(

    {

        opportunity:
            1,

        user:
            1

    },

    {

        unique:
            true

    }

);


// ==========================================
// MODEL
// ==========================================

const VolunteerApplication =
    mongoose.model(

        "VolunteerApplication",

        volunteerApplicationSchema

    );


module.exports =
    VolunteerApplication;