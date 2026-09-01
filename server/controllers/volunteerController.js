// ==========================================
// KINDLINK VOLUNTEER CONTROLLER
// ==========================================

const mongoose =
    require("mongoose");


const VolunteerOpportunity =
    require(
        "../models/VolunteerOpportunity"
    );


const VolunteerApplication =
    require(
        "../models/VolunteerApplication"
    );


// ==========================================
// CREATE VOLUNTEER OPPORTUNITY
// ORGANISATION ONLY
// ==========================================

const createVolunteerOpportunity =
    async (req, res) => {

        try {

            const {

                title,
                category,
                description,

                city,
                state,
                mode,

                schedule,
                requiredSkills,
                slots,

                isUrgent,
                image

            } = req.body;


            // ==================================
            // REQUIRED FIELDS
            // ==================================

            if (
                !title ||
                !category ||
                !description
            ) {

                return res.status(400).json({

                    success:
                        false,

                    message:
                        "Please provide title, category and description"

                });

            }


            // ==================================
            // VALID CATEGORIES
            // ==================================

            const validCategories = [

                "education",
                "animals",
                "environment",
                "community",
                "emergency",
                "other"

            ];


            if (
                !validCategories.includes(
                    category
                )
            ) {

                return res.status(400).json({

                    success:
                        false,

                    message:
                        "Invalid volunteer category"

                });

            }


            // ==================================
            // VALID MODE
            // ==================================

            const validModes = [

                "onsite",
                "online",
                "hybrid"

            ];


            const opportunityMode =
                mode ||
                "onsite";


            if (
                !validModes.includes(
                    opportunityMode
                )
            ) {

                return res.status(400).json({

                    success:
                        false,

                    message:
                        "Invalid volunteer mode"

                });

            }


            // ==================================
            // VALID SLOTS
            // ==================================

            const parsedSlots =
                slots
                    ? Number(slots)
                    : 1;


            if (
                !Number.isInteger(
                    parsedSlots
                ) ||
                parsedSlots < 1
            ) {

                return res.status(400).json({

                    success:
                        false,

                    message:
                        "Volunteer slots must be at least 1"

                });

            }


            // ==================================
            // SKILLS ARRAY
            // ==================================

            let skillsArray =
                [];


            if (
                Array.isArray(
                    requiredSkills
                )
            ) {

                skillsArray =
                    requiredSkills
                        .map(skill =>
                            String(skill).trim()
                        )
                        .filter(Boolean);

            } else if (
                typeof requiredSkills ===
                "string"
            ) {

                skillsArray =
                    requiredSkills
                        .split(",")
                        .map(skill =>
                            skill.trim()
                        )
                        .filter(Boolean);

            }


            // ==================================
            // CREATE OPPORTUNITY
            // ==================================

            const opportunity =
                await VolunteerOpportunity.create({

                    organisation:
                        req.organisation._id,

                    title:
                        title.trim(),

                    category,

                    description:
                        description.trim(),

                    location: {

                        city:
                            city
                                ? city.trim()
                                : "",

                        state:
                            state
                                ? state.trim()
                                : "",

                        mode:
                            opportunityMode

                    },

                    schedule:
                        schedule
                            ? schedule.trim()
                            : "Flexible",

                    requiredSkills:
                        skillsArray,

                    slots:
                        parsedSlots,

                    isUrgent:
                        Boolean(isUrgent),

                    image:
                        image
                            ? image.trim()
                            : ""

                });


            await opportunity.populate(

                "organisation",

                "organisationName verificationStatus"

            );


            return res.status(201).json({

                success:
                    true,

                message:
                    "Volunteer opportunity created successfully",

                opportunity

            });


        } catch (error) {

            console.error(

                "Create Volunteer Opportunity Error:",

                error

            );


            return res.status(500).json({

                success:
                    false,

                message:
                    "Server error"

            });

        }

    };


// ==========================================
// GET ALL PUBLIC OPPORTUNITIES
// ==========================================

const getVolunteerOpportunities =
    async (req, res) => {

        try {

            const opportunities =
                await VolunteerOpportunity

                    .find({

                        status:
                            "active"

                    })

                    .populate(

                        "organisation",

                        "organisationName verificationStatus"

                    )

                    .sort({

                        isUrgent:
                            -1,

                        createdAt:
                            -1

                    });


            return res.status(200).json({

                success:
                    true,

                count:
                    opportunities.length,

                opportunities

            });


        } catch (error) {

            console.error(

                "Get Volunteer Opportunities Error:",

                error

            );


            return res.status(500).json({

                success:
                    false,

                message:
                    "Server error"

            });

        }

    };


// ==========================================
// GET SINGLE OPPORTUNITY
// ==========================================

const getVolunteerOpportunityById =
    async (req, res) => {

        try {

            if (
                !mongoose.Types.ObjectId.isValid(
                    req.params.id
                )
            ) {

                return res.status(400).json({

                    success:
                        false,

                    message:
                        "Invalid opportunity ID"

                });

            }


            const opportunity =
                await VolunteerOpportunity

                    .findById(
                        req.params.id
                    )

                    .populate(

                        "organisation",

                        "organisationName email phone verificationStatus"

                    );


            if (!opportunity) {

                return res.status(404).json({

                    success:
                        false,

                    message:
                        "Volunteer opportunity not found"

                });

            }


            return res.status(200).json({

                success:
                    true,

                opportunity

            });


        } catch (error) {

            console.error(

                "Get Volunteer Opportunity Error:",

                error

            );


            return res.status(500).json({

                success:
                    false,

                message:
                    "Server error"

            });

        }

    };


// ==========================================
// GET LOGGED-IN ORGANISATION OPPORTUNITIES
// ==========================================

const getOrganisationVolunteerOpportunities =
    async (req, res) => {

        try {

            const opportunities =
                await VolunteerOpportunity

                    .find({

                        organisation:
                            req.organisation._id

                    })

                    .sort({

                        createdAt:
                            -1

                    });


            return res.status(200).json({

                success:
                    true,

                count:
                    opportunities.length,

                opportunities

            });


        } catch (error) {

            console.error(

                "Organisation Volunteer Opportunities Error:",

                error

            );


            return res.status(500).json({

                success:
                    false,

                message:
                    "Server error"

            });

        }

    };


// ==========================================
// APPLY FOR VOLUNTEER OPPORTUNITY
// USER ONLY
// ==========================================

const applyForVolunteerOpportunity =
    async (req, res) => {

        try {

            const opportunityId =
                req.params.id;


            // ==================================
            // VALID OPPORTUNITY ID
            // ==================================

            if (
                !mongoose.Types.ObjectId.isValid(
                    opportunityId
                )
            ) {

                return res.status(400).json({

                    success:
                        false,

                    message:
                        "Invalid opportunity ID"

                });

            }


            // ==================================
            // FIND OPPORTUNITY
            // ==================================

            const opportunity =
                await VolunteerOpportunity.findById(
                    opportunityId
                );


            if (!opportunity) {

                return res.status(404).json({

                    success:
                        false,

                    message:
                        "Volunteer opportunity not found"

                });

            }


            if (
                opportunity.status !==
                "active"
            ) {

                return res.status(400).json({

                    success:
                        false,

                    message:
                        "This volunteer opportunity is closed"

                });

            }


            // ==================================
            // CHECK DUPLICATE
            // ==================================

            const existingApplication =
                await VolunteerApplication.findOne({

                    opportunity:
                        opportunity._id,

                    user:
                        req.user._id

                });


            if (existingApplication) {

                return res.status(409).json({

                    success:
                        false,

                    message:
                        "You have already applied for this opportunity"

                });

            }


            // ==================================
            // FORM DATA
            // ==================================

            const {

                name,
                age,
                email,
                phone,
                skills,
                message

            } = req.body;


            const applicantName =

                name
                    ? name.trim()
                    : req.user.name;


            const applicantEmail =

                email
                    ? email
                        .trim()
                        .toLowerCase()
                    : req.user.email;


            const applicantPhone =

                phone
                    ? phone.trim()
                    : (
                        req.user.phone ||
                        ""
                    );


            // ==================================
            // VALIDATION
            // ==================================

            if (
                !applicantName ||
                !age ||
                !applicantEmail ||
                !applicantPhone
            ) {

                return res.status(400).json({

                    success:
                        false,

                    message:
                        "Name, age, email and phone are required"

                });

            }


            const parsedAge =
                Number(age);


            if (
                !Number.isInteger(
                    parsedAge
                ) ||
                parsedAge < 16 ||
                parsedAge > 80
            ) {

                return res.status(400).json({

                    success:
                        false,

                    message:
                        "Age must be between 16 and 80"

                });

            }


            // ==================================
            // EMAIL VALIDATION
            // ==================================

            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailRegex.test(
                    applicantEmail
                )
            ) {

                return res.status(400).json({

                    success:
                        false,

                    message:
                        "Please provide a valid email address"

                });

            }


            // ==================================
            // PHONE VALIDATION
            // ==================================

            const phoneRegex =
                /^[0-9]{10}$/;


            if (
                !phoneRegex.test(
                    applicantPhone
                )
            ) {

                return res.status(400).json({

                    success:
                        false,

                    message:
                        "Phone number must contain exactly 10 digits"

                });

            }


            // ==================================
            // CREATE APPLICATION
            // ==================================

            const application =
                await VolunteerApplication.create({

                    opportunity:
                        opportunity._id,

                    user:
                        req.user._id,

                    organisation:
                        opportunity.organisation,

                    name:
                        applicantName,

                    age:
                        parsedAge,

                    email:
                        applicantEmail,

                    phone:
                        applicantPhone,

                    skills:
                        skills
                            ? skills.trim()
                            : "",

                    message:
                        message
                            ? message.trim()
                            : ""

                });


            await application.populate([

                {

                    path:
                        "opportunity",

                    select:
                        "title category location schedule"

                },

                {

                    path:
                        "organisation",

                    select:
                        "organisationName verificationStatus"

                }

            ]);


            return res.status(201).json({

                success:
                    true,

                message:
                    "Volunteer application submitted successfully",

                application

            });


        } catch (error) {

            // Duplicate index protection

            if (
                error.code === 11000
            ) {

                return res.status(409).json({

                    success:
                        false,

                    message:
                        "You have already applied for this opportunity"

                });

            }


            console.error(

                "Volunteer Application Error:",

                error

            );


            return res.status(500).json({

                success:
                    false,

                message:
                    "Server error"

            });

        }

    };


// ==========================================
// GET LOGGED-IN USER APPLICATIONS
// ==========================================

const getMyVolunteerApplications =
    async (req, res) => {

        try {

            const applications =
                await VolunteerApplication

                    .find({

                        user:
                            req.user._id

                    })

                    .populate(

                        "opportunity",

                        "title category description location schedule status isUrgent"

                    )

                    .populate(

                        "organisation",

                        "organisationName verificationStatus"

                    )

                    .sort({

                        createdAt:
                            -1

                    });


            return res.status(200).json({

                success:
                    true,

                count:
                    applications.length,

                applications

            });


        } catch (error) {

            console.error(

                "Get User Volunteer Applications Error:",

                error

            );


            return res.status(500).json({

                success:
                    false,

                message:
                    "Server error"

            });

        }

    };


// ==========================================
// GET APPLICATIONS RECEIVED BY ORGANISATION
// ==========================================

const getOrganisationVolunteerApplications =
    async (req, res) => {

        try {

            const applications =
                await VolunteerApplication

                    .find({

                        organisation:
                            req.organisation._id

                    })

                    .populate(

                        "opportunity",

                        "title category location schedule status"

                    )

                    .populate(

                        "user",

                        "name email phone"

                    )

                    .sort({

                        createdAt:
                            -1

                    });


            return res.status(200).json({

                success:
                    true,

                count:
                    applications.length,

                applications

            });


        } catch (error) {

            console.error(

                "Organisation Volunteer Applications Error:",

                error

            );


            return res.status(500).json({

                success:
                    false,

                message:
                    "Server error"

            });

        }

    };


// ==========================================
// ACCEPT / REJECT APPLICATION
// ORGANISATION ONLY
// ==========================================

const updateVolunteerApplicationStatus =
    async (req, res) => {

        try {

            const {

                status

            } = req.body;


            if (
                !mongoose.Types.ObjectId.isValid(
                    req.params.applicationId
                )
            ) {

                return res.status(400).json({

                    success:
                        false,

                    message:
                        "Invalid application ID"

                });

            }


            // ==================================
            // VALID STATUS
            // ==================================

            const allowedStatuses = [

                "accepted",
                "rejected"

            ];


            if (
                !allowedStatuses.includes(
                    status
                )
            ) {

                return res.status(400).json({

                    success:
                        false,

                    message:
                        "Status must be accepted or rejected"

                });

            }


            // ==================================
            // FIND APPLICATION BELONGING TO ORG
            // ==================================

            const application =
                await VolunteerApplication.findOne({

                    _id:
                        req.params.applicationId,

                    organisation:
                        req.organisation._id

                });


            if (!application) {

                return res.status(404).json({

                    success:
                        false,

                    message:
                        "Volunteer application not found"

                });

            }


            // ==================================
            // UPDATE
            // ==================================

            application.status =
                status;


            application.reviewedAt =
                new Date();


            await application.save();


            await application.populate([

                {

                    path:
                        "opportunity",

                    select:
                        "title category location schedule"

                },

                {

                    path:
                        "user",

                    select:
                        "name email phone"

                }

            ]);


            return res.status(200).json({

                success:
                    true,

                message:
                    `Volunteer application ${status} successfully`,

                application

            });


        } catch (error) {

            console.error(

                "Update Volunteer Application Error:",

                error

            );


            return res.status(500).json({

                success:
                    false,

                message:
                    "Server error"

            });

        }

    };


// ==========================================
// EXPORT CONTROLLERS
// ==========================================

module.exports = {

    createVolunteerOpportunity,

    getVolunteerOpportunities,

    getVolunteerOpportunityById,

    getOrganisationVolunteerOpportunities,

    applyForVolunteerOpportunity,

    getMyVolunteerApplications,

    getOrganisationVolunteerApplications,

    updateVolunteerApplicationStatus

};