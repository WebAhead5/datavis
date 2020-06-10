const router = require('express').Router();
const db = require('../../database/db_connection')

router.post("/", async (req, res) => {
    try {

        //get data from DB based on the user ID held in the JWT
        const user = await db.query(
            "SELECT first_name, last_name FROM users WHERE user_id = $1",
            [req.user.id]
        );

        //Also send table data for user? 

        // const table = await db.query(
        //     "SELECT table_id, table_name FROM tables WHERE user_id = $1",
        //     [req.user.id]
        // );

        //return user data matching user ID in JWT token for use in dashboard
        res.json(user.rows[0]);

        //also return table data?

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router