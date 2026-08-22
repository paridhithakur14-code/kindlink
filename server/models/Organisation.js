const mongoose = require("mongoose");

const organisationSchema = new mongoose.Schema(
    {
        organisationName: {
            type: String,
            required: true,
            trim: true
        },

        organisationType: {
            type: String,
            required: true,
            enum: [
                "ngo",
                "trust",
                "foundation",
                "shelter",
                "community",
                "other"
            ]
        },

        registrationNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        yearEstablished: {
            type: Number,
            default: null
        },

        contactPerson: {
            name: {
                type: String,
                required: true,
                trim: true
            },

            designation: {
                type: String,
                trim: true,
                default: ""
            }
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        phone: {
            type: String,
            required: true,
            trim: true
        },

        location: {
            address: {
                type: String,
                required: true,
                trim: true
            },

            city: {
                type: String,
                required: true,
                trim: true
            },

            state: {
                type: String,
                required: true,
                trim: true
            }
        },

        causes: {
            type: [String],
            default: []
        },

        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500
        },

        website: {
            type: String,
            trim: true,
            default: ""
        },

        socialLink: {
            type: String,
            trim: true,
            default: ""
        },

        verificationDocument: {
            type: String,
            default: ""
        },

        verificationStatus: {
            type: String,
            enum: [
                "pending",
                "verified",
                "rejected"
            ],
            default: "pending"
        },

        role: {
            type: String,
            default: "organisation"
        },

        password: {
            type: String,
            required: true,
            minlength: 6
        }
    },
    {
        timestamps: true
    }
);


const Organisation =
    mongoose.model(
        "Organisation",
        organisationSchema
    );


module.exports = Organisation;