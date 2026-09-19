// ==========================================
// VOLUNTEER APPLICATION MODEL
// ==========================================

const mongoose = require("mongoose");


const volunteerApplicationSchema =
    new mongoose.Schema(
        {

            // Logged-in KindLink user
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },


            // Volunteer opportunity
            opportunity: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "VolunteerOpportunity",
                required: true
            },


            // Organisation that created opportunity
            organisation: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Organisation",
                required: true
            },


            fullName: {
                type: String,
                required: true,
                trim: true
            },


            age: {
                type: Number,
                required: true,
                min: 16,
                max: 80
            },


            email: {
                type: String,
                required: true,
                trim: true,
                lowercase: true
            },


            phone: {
                type: String,
                required: true,
                trim: true
            },


            skills: {
                type: String,
                default: "",
                trim: true
            },


            message: {
                type: String,
                default: "",
                trim: true
            },


            status: {
                type: String,
                enum: [
                    "pending",
                    "accepted",
                    "rejected",
                    "completed"
                ],
                default: "pending"
            }

        },
        {
            timestamps: true
        }
    );


// Prevent same user applying twice
// for the same opportunity

volunteerApplicationSchema.index(
    {
        user: 1,
        opportunity: 1
    },
    {
        unique: true
    }
);


module.exports =
    mongoose.model(
        "VolunteerApplication",
        volunteerApplicationSchema
    );