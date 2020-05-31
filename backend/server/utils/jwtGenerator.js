const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_id) {

    //info to store inside the JWT - add tables later?
    const payload = {
        user: {
            id: user_id
        }
    };

    //Sign JWT with secret and return
    return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1h" });
}

module.exports = jwtGenerator;