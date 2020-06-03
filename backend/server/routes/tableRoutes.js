const router = require('express').Router();
const db = require('../../database/db_connection')

router.post("/getTables", async (req, res) => {
    try {

        const tables = await db.query(
            "SELECT table_id, table_name, user_id, data FROM tables WHERE user_id = $1",
            [req.user.id]
        );

        // console.log("table data being returned", tables.rows)

        //return user data matching user ID in JWT token for use in dashboard
        res.json(tables.rows);


    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


router.post("/addTable", async (req, res) => {
    try {

        const { table_name, data } = req.body;

        const table = await db.query(
            "INSERT INTO tables (table_name, user_id, data) VALUES ($1, $2, $3) RETURNING *",
            [table_name, req.user.id, data]
        );

        // console.log("table data being returned", table.rows)

        //return user data matching user ID in JWT token for use in dashboard
        res.json("table added to database");

        //also return table data?

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


module.exports = router


//id routes

router.get('/:id', (req, res) => {
    console.log('its the route: ',this.route)
    const { id } = req.params;
    res.send(`<h1>sending table data on ID: ${id}.....</h1>`)
})

router.post('/:id', (req, res) => {
    const { id } = req.params;
    res.send("<h1>adding table data.....</h1>")
})


module.exports = router