const router = require("express").Router();
const db = require("../../database/db_connection");

router.post("/getTables", async (req, res) => {
  try {
    const tables = await db.query(
      "SELECT table_id, table_name, user_id, data FROM tables WHERE user_id = $1",
      [req.user.id]
    );


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

    let dataIDs = JSON.parse(data).map((row, index) => {
      row["uID"] = index;
      return row;
    });

    dataIDs = JSON.stringify(dataIDs);

    const table = await db.query(
      "INSERT INTO tables (table_name, user_id, data) VALUES ($1, $2, $3) RETURNING *",
      [table_name, req.user.id, dataIDs]
    );

    //return table id that has been added
    res.json(table.rows[0].table_id);

    //also return table data?
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


router.post("/editcontent", async (req, res) => {
  try {

    const { newValueOfCell, columnName, rowNum, selectedTable } = req.body;


    let selRowNum = rowNum.slice(6)
    let selTable = parseInt(selectedTable)
    let selcolumnName = '"' + columnName + '"'


    //WORKING QUERY
    // "update tables t set data = (select jsonb_agg( case when (x.obj ->> 'uID')::int = 0 and table_id = 2 then x.obj || '{'Transactions': 50}' else x.obj end order by x.ord ) new_data from jsonb_array_elements(t.data) with ordinality x(obj, ord) )",

    const updateCell = db.query(
      `update tables t set data = (select jsonb_agg( case when (x.obj ->> 'uID')::int = ${selRowNum} and table_id = ${selTable} then x.obj || '{${selcolumnName}: "${newValueOfCell}"}' else x.obj end order by x.ord ) new_data from jsonb_array_elements(t.data) with ordinality x(obj, ord) )`, (err, res) => {
        if (err) {
          // res.status(500).send("Database did not update");
          console.log(err)
        }
        // res.send(`table ${selTable}, row ${selRowNum} updated`);
        console.log(res)

      });
  } catch (error) {
    res.status(500).send("Server error");
  }
});


router.post("/delete", async (req, res) => {
  try {
    const { table_id } = req.body;


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
  const { id } = req.params;
  res.send(`<h1>sending table data on ID: ${id}.....</h1>`);
});

router.post("/:id", (req, res) => {
  const { id } = req.params;
  res.send("<h1>adding table data.....</h1>");
});

module.exports = router;
