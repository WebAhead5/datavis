const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {

    // Get token from request header
    const token = req.header("jwt_token");

    // Check if JWT token exists
    if (!token) {
        return res.status(403).json({ msg: "authorization denied" });
    }

    // Verify JWT token
    try {
        //this will return whats inside the JWT token inside the verify variible
        const verify = jwt.verify(token, process.env.jwtSecret);

        //set user to user ID inside the JWT
        req.user = verify.user;

        next();

    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};