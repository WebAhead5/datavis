
const router = require('express').Router();
const bcrypt = require("bcrypt");
const db = require('../../database/db_connection')
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const checkJWT = require("../middleware/checkJWT");


//Login Route
router.post("/login", validInfo, async (req, res) => {
    const { email, password } = req.body;

    try {

        //check if email is in our DB
        const user = await db.query("SELECT * FROM users WHERE email = $1", [
            email
        ]);
        //if no email found, return error
        if (user.rows.length === 0) {
            return res.status(401).json("Invalid Credentials");
        }

        //compare password with hashed password in DB for that email
        const validPassword = await bcrypt.compare(
            password,
            user.rows[0].password
        );

        //if password not valid, return error
        if (!validPassword) {
            return res.status(401).json("Invalid Credentials");
        }

        //Generate JWT token for user who is now logged in
        const jwtToken = jwtGenerator(user.rows[0].user_id);
        return res.json({ jwtToken });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


//Register Route
router.post("/register", validInfo, async (req, res) => {
    const { email, first_name, last_name, password } = req.body;

    try {

        //Check if user already exisits in DB with that email
        const user = await db.query("SELECT * FROM users WHERE email = $1", [
            email
        ]);

        //if email is found, return error
        if (user.rows.length > 0) {
            return res.status(401).json("User already exists!");
        }

        //Encrypt Password
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);

        //Add new user to Database
        let newUser = await db.query(
            "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
            [first_name, last_name, email, bcryptPassword]
        );

        //Generate JWT token for the new user
        const jwtToken = jwtGenerator(newUser.rows[0].user_id);
        return res.json({ jwtToken });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


//Verify JWT token route
router.post("/verify", checkJWT, (req, res) => {
    try {

        //If user makes it through authorize middleware, we know this is a valid JWT and return true
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


module.exports = router