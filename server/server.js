// ==========================================
// KINDLINK SERVER
// ==========================================

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");


// ==========================================
// LOAD ENVIRONMENT VARIABLES
// ==========================================

dotenv.config();


// ==========================================
// DATABASE
// ==========================================

const connectDB = require("./config/db");

connectDB();


// ==========================================
// ROUTES
// ==========================================

const authRoutes =
    require("./routes/authRoutes");

const organisationAuthRoutes =
    require("./routes/organisationAuthRoutes");

const campaignRoutes =
    require("./routes/campaignRoutes");    


// ==========================================
// CREATE EXPRESS APP
// ==========================================

const app = express();


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);


// ==========================================
// API ROUTES
// ==========================================

// User authentication
app.use(
    "/api/auth",
    authRoutes
);


// Organisation authentication
app.use(
    "/api/organisations/auth",
    organisationAuthRoutes
);

app.use(
    "/api/campaigns",
    campaignRoutes
);


// ==========================================
// TEST ROUTE
// ==========================================

app.get("/", (req, res) => {

    res.json({

        success: true,

        message:
            "KindLink API is running successfully"

    });

});


// ==========================================
// SERVER PORT
// ==========================================

const PORT =
    process.env.PORT || 5000;


// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {

    console.log(
        `KindLink server running on port ${PORT}`
    );

});