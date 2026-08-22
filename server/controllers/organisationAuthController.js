// ==========================================
// KINDLINK ORGANISATION AUTH CONTROLLER
// ==========================================

const Organisation = require("../models/Organisation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ==========================================
// GENERATE ORGANISATION JWT TOKEN
// ==========================================

const generateOrganisationToken = (id) => {

    return jwt.sign(
        {
            id,
            role: "organisation"
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );

};


// ==========================================
// REGISTER ORGANISATION
// ==========================================

const registerOrganisation = async (req, res) => {

    try {

        const {
            organisationName,
            organisationType,
            registrationNumber,
            yearEstablished,
            contactPerson,
            email,
            phone,
            location,
            causes,
            description,
            website,
            socialLink,
            password
        } = req.body;


        if (
            !organisationName ||
            !organisationType ||
            !registrationNumber ||
            !contactPerson?.name ||
            !email ||
            !phone ||
            !location?.address ||
            !location?.city ||
            !location?.state ||
            !description ||
            !password
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Please provide all required organisation details"
            });

        }


        const normalizedEmail =
            email.trim().toLowerCase();


        const existingEmail =
            await Organisation.findOne({
                email: normalizedEmail
            });


        if (existingEmail) {

            return res.status(400).json({
                success: false,
                message:
                    "Organisation with this email already exists"
            });

        }


        const existingRegistration =
            await Organisation.findOne({
                registrationNumber:
                    registrationNumber.trim()
            });


        if (existingRegistration) {

            return res.status(400).json({
                success: false,
                message:
                    "Organisation registration number already exists"
            });

        }


        const salt =
            await bcrypt.genSalt(10);


        const hashedPassword =
            await bcrypt.hash(
                password,
                salt
            );


        const organisation =
            await Organisation.create({

                organisationName:
                    organisationName.trim(),

                organisationType,

                registrationNumber:
                    registrationNumber.trim(),

                yearEstablished:
                    yearEstablished || null,

                contactPerson: {

                    name:
                        contactPerson.name.trim(),

                    designation:
                        contactPerson.designation
                            ? contactPerson.designation.trim()
                            : ""

                },

                email:
                    normalizedEmail,

                phone:
                    phone.trim(),

                location: {

                    address:
                        location.address.trim(),

                    city:
                        location.city.trim(),

                    state:
                        location.state.trim()

                },

                causes:
                    Array.isArray(causes)
                        ? causes
                        : [],

                description:
                    description.trim(),

                website:
                    website
                        ? website.trim()
                        : "",

                socialLink:
                    socialLink
                        ? socialLink.trim()
                        : "",

                verificationStatus:
                    "pending",

                role:
                    "organisation",

                password:
                    hashedPassword

            });


        return res.status(201).json({

            success: true,

            message:
                "Organisation registration submitted successfully",

            organisation: {

                id:
                    organisation._id,

                organisationName:
                    organisation.organisationName,

                organisationType:
                    organisation.organisationType,

                registrationNumber:
                    organisation.registrationNumber,

                email:
                    organisation.email,

                phone:
                    organisation.phone,

                contactPerson:
                    organisation.contactPerson,

                location:
                    organisation.location,

                causes:
                    organisation.causes,

                verificationStatus:
                    organisation.verificationStatus,

                role:
                    organisation.role

            }

        });


    } catch (error) {

        console.error(
            "Organisation Registration Error:",
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
// LOGIN ORGANISATION
// ==========================================

const loginOrganisation = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        if (!email || !password) {

            return res.status(400).json({

                success: false,

                message:
                    "Please provide email and password"

            });

        }


        const normalizedEmail =
            email.trim().toLowerCase();


        // ======================================
        // DEBUG: EMAIL BEING TESTED
        // ======================================

        console.log(
            "Login email:",
            normalizedEmail
        );


        const organisation =
            await Organisation.findOne({
                email: normalizedEmail
            });


        // ======================================
        // DEBUG: WAS ORGANISATION FOUND?
        // ======================================

        console.log(
            "Organisation found:",
            organisation ? "YES" : "NO"
        );


        if (!organisation) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid email or password"

            });

        }


        const isPasswordCorrect =
            await bcrypt.compare(
                password,
                organisation.password
            );


        // ======================================
        // DEBUG: PASSWORD MATCH?
        // ======================================

        console.log(
            "Password correct:",
            isPasswordCorrect
        );


        if (!isPasswordCorrect) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid email or password"

            });

        }


        const token =
            generateOrganisationToken(
                organisation._id
            );


        return res.status(200).json({

            success: true,

            message:
                "Organisation login successful",

            token,

            organisation: {

                id:
                    organisation._id,

                organisationName:
                    organisation.organisationName,

                organisationType:
                    organisation.organisationType,

                registrationNumber:
                    organisation.registrationNumber,

                email:
                    organisation.email,

                phone:
                    organisation.phone,

                contactPerson:
                    organisation.contactPerson,

                location:
                    organisation.location,

                causes:
                    organisation.causes,

                description:
                    organisation.description,

                website:
                    organisation.website,

                socialLink:
                    organisation.socialLink,

                verificationStatus:
                    organisation.verificationStatus,

                role:
                    organisation.role

            }

        });


    } catch (error) {

        console.error(
            "Organisation Login Error:",
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
// GET LOGGED-IN ORGANISATION PROFILE
// ==========================================

const getOrganisationProfile =
    async (req, res) => {

        try {

            const organisation =
                req.organisation;


            return res.status(200).json({

                success: true,

                organisation: {

                    id:
                        organisation._id,

                    organisationName:
                        organisation.organisationName,

                    organisationType:
                        organisation.organisationType,

                    registrationNumber:
                        organisation.registrationNumber,

                    yearEstablished:
                        organisation.yearEstablished,

                    email:
                        organisation.email,

                    phone:
                        organisation.phone,

                    contactPerson:
                        organisation.contactPerson,

                    location:
                        organisation.location,

                    causes:
                        organisation.causes,

                    description:
                        organisation.description,

                    website:
                        organisation.website,

                    socialLink:
                        organisation.socialLink,

                    verificationStatus:
                        organisation.verificationStatus,

                    role:
                        organisation.role

                }

            });


        } catch (error) {

            console.error(
                "Get Organisation Profile Error:",
                error
            );


            return res.status(500).json({

                success: false,
                message: "Server error"

            });

        }

    };

// ==========================================
// EXPORT CONTROLLERS
// ==========================================

module.exports = {

    registerOrganisation,

    loginOrganisation,

    getOrganisationProfile

};