const router = require("express").Router();
const db = require("../../database/db_connection");

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

/* Doooooooont deleeeeeeteee */
router.get("/tables", async (req, res) => {
 
 
    try {
        if (localStorage.getItem('changedCell') === null) {
          return;

        } else {
          
          const changedCell = JSON.parse(localStorage.getItem("changedCell"));
          const newValueOfCell = changedCell.newValueOfCell;
          const columnName = changedCell.columnName;
          console.log(newValueOfCell,'this is the new value from the BE');
          
          const updateCell = await db.querey(
          `update tables t set data = (select jsonb_agg( case when (x.obj ->> 'id')::int = 1 and table_id=$1 then x.obj || '{$2: $3}' else x.obj end order by x.ord ) new_data from jsonb_array_elements(t.data) with ordinality x(obj, ord) )`
          ,[newValueOfCell, columnName]);

        }

  } catch (error) {
    res.status(500).send("Server error");
  }
});

/* Doooooooont deleeeeeeteee */

router.post("/delete", async (req, res) => {
  try {
    const { table_id } = req.body;
    console.log("delete table route hit, delting table id", table_id);

    const table = await db.query("DELETE FROM tables WHERE table_id = $1", [
      table_id,
    ]);
    //return user data matching user ID in JWT token for use in dashboard
    res.json(`table ${table_id} deleted`);

    //also return table data?
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//id routes

router.get("/:id", (req, res) => {
  console.log("its the route: ", this.route);
  const { id } = req.params;
  res.send(`<h1>sending table data on ID: ${id}.....</h1>`);
});

router.post("/:id", (req, res) => {
  const { id } = req.params;
  res.send("<h1>adding table data.....</h1>");
});

module.exports = router;
