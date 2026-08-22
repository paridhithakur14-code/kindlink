const jwt = require("jsonwebtoken");
const Organisation = require("../models/Organisation");


// ==========================================
// PROTECT ORGANISATION ROUTES
// ==========================================

const protectOrganisation = async (req, res, next) => {

    try {

        let token;


        // Get token from Authorization header
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {

            token =
                req.headers.authorization.split(" ")[1];

        }


        // No token
        if (!token) {

            return res.status(401).json({

                success: false,
                message: "Not authorized, no token"

            });

        }


        // Verify token
        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );


        // Make sure this is an organisation token
        if (
            decoded.role !== "organisation"
        ) {

            return res.status(401).json({

                success: false,
                message:
                    "Not authorized as an organisation"

            });

        }


        // Find organisation
        const organisation =
            await Organisation
                .findById(decoded.id)
                .select("-password");


        if (!organisation) {

            return res.status(401).json({

                success: false,
                message:
                    "Organisation not found"

            });

        }


        // Attach organisation to request
        req.organisation =
            organisation;


        next();


    } catch (error) {

        console.error(
            "Organisation Auth Error:",
            error.message
        );


        return res.status(401).json({

            success: false,
            message:
                "Not authorized, invalid token"

        });

    }

};


module.exports = {
    protectOrganisation
};