const router = require('express').Router();
const db = require('../../database/db_connection')

router.post("/getTables", async (req, res) => {
    try {

        const tables = await db.query(
            "SELECT table_id, table_name, user_id, data FROM tables WHERE user_id = $1",
            [req.user.id]
        );
        console.time();

        
        // console.timeEnd("Time this");
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

        //return table id that has been added
        res.json(table.rows[0].table_id);

        //also return table data?

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});



// router.post("/updateTable", async (req, res) => {

//     try {
        

//         const { table_name, data } = req.body;
//         console.log('before the query',req.body);
        

//         const table = await db.query(
//             "SELECT * FROM TABLE  WHERE table_id=2",
//             [table_name, req.user.id, data]
//         );
//         console.log('after the query',req.body);
//         console.log('table rows',table.rows);

//         // console.log("table data being returned", table.rows)

//         //return table id that has been added
//         res.json(table.rows[0].table_id);

//         //also return table data?

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send("Server error");
//     }
// });




router.post("/delete", async (req, res) => {
    try {

        const { table_id } = req.body;
        console.log("delete table route hit, delting table id", table_id)

        const table = await db.query(
            "DELETE FROM tables WHERE table_id = $1",
            [table_id]
        );
        //return user data matching user ID in JWT token for use in dashboard
        res.json(`table ${table_id} deleted`);

        //also return table data?

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});



//id routes

router.get('/:id', (req, res) => {
    console.log('its the route: ', this.route)
    const { id } = req.params;
    res.send(`<h1>sending table data on ID: ${id}.....</h1>`)
})

router.post('/:id', (req, res) => {
    const { id } = req.params;
    res.send("<h1>adding table data.....</h1>")
})


module.exports = router