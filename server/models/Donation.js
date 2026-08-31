// ==========================================
// KINDLINK DONATION MODEL
// ==========================================

const mongoose = require("mongoose");


const donationSchema = new mongoose.Schema(
    {

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },


        campaign: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Campaign",
            required: true
        },


        organisation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organisation",
            required: true
        },


        amount: {
            type: Number,
            required: true,
            min: 1
        },


        paymentMethod: {
            type: String,
            default: "demo"
        },


        status: {
            type: String,

            enum: [
                "completed",
                "pending",
                "failed"
            ],

            default: "completed"
        },


        transactionId: {
            type: String,
            required: true,
            unique: true
        }

    },
    {
        timestamps: true
    }
);


const Donation =
    mongoose.model(
        "Donation",
        donationSchema
    );


module.exports = Donation;