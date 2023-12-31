const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const Listing = require("../models/listing.js");
const { saveRedirectUrl } = require("../middleware.js");
 const wrapAsync = require("../utils/wrapAsync");

const userController = require ("../controllers/users.js")

router.route("/signup")
.get(userController.renderSignupForm)    
.post(wrapAsync(userController.signup));

router.route("/login")
.get( userController.renderLoginForm)
.post(
    saveRedirectUrl,
     passport.authenticate("local", { 
        failureRedirect: '/login', 
        failureFlash: true 
    }), 
    userController.login
    );


router.get("/logout", userController.logout );

module.exports = router;
