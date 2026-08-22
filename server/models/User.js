const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            minlength: 6
        },

        phone: {
            type: String,
            trim: true
        },

        city: {
            type: String,
            trim: true,
            default: ""
        },

        interests: {
            type: [String],
            default: []
        },

        role: {
            type: String,
            default: "user"
        }
    },
    {
        timestamps: true
    }
);

const User =
    mongoose.model("User", userSchema);

module.exports = User;