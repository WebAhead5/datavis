const router = require('express').Router();
const db = require('../../database/db_connection')

//default route

router.get('/', (req, res) => {
    console.log("chart route hit", req.body)
    res.send(`<h1>Chart Route</h1>`)
})

router.post("/save", async (req, res) => {

    try {
        // console.log("chart save route hit", req.body)

        const { jpeg } = req.body;

        const chart = await db.query(
            "INSERT INTO charts (user_id, jpeg) VALUES ($1, $2) RETURNING *",
            [req.user.id, jpeg]
        );

        // res.json(chart.rows[0].table_id);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.post("/history", async (req, res) => {
    try {

        const charts = await db.query(
            "SELECT jpeg, chart_id FROM charts WHERE user_id = $1",
            [req.user.id]
        );

        //return user data matching user ID in JWT token for use in dashboard
        res.json(charts.rows);


    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

//id routes

router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.send(`<h1>sending chart data on ID: ${id}.....</h1>`)
})

router.post('/:id', (req, res) => {
    const { id } = req.params;
    res.send("<h1>adding table data.....</h1>")
})

module.exports = router