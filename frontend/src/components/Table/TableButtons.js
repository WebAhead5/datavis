import React, { Fragment } from "react";
import Popup from "reactjs-popup";
import { toast } from "react-toastify";
import getTables from "../../utils/getTables";

export default function TableButtons({
  setData,
  selectedTable,
  tableList,
  tableName,
  setTableName,
  setTableList,
}) {
  const deleteTable = async () => {
    try {
      let table_id = selectedTable;
      console.log("del table clicked, id", selectedTable);
      const body = { table_id };
      //call API for user infomation for use in dashboard
      const res = await fetch( process.env.REACT_APP_API_URL + "/table/delete", {
        method: "POST",
        headers: {
          jwt_token: localStorage.token,
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      //result from DB request on backend - will send default info
      const parseData = await res.json();
      console.log(parseData);

      tableList.forEach((row) => {
        if (row.table_id === parseInt(selectedTable)) {
          setTableName(row.table_name);
        }
      });

      toast.error(`${tableName.toUpperCase()} table has been deleted`);

      //reset page
      getTables(setTableList);
      localStorage.removeItem("tabledata");
      setData(null);
    } catch (err) {
      console.error(err.message);
      toast.info(`${selectedTable} could not be deleted!`);
    }
  };
  return (
    <Fragment>
      <div className="tableButtons">
        <div className="genDiv">
          <a href="/createChart">
            <button className="genChartBtn">
              GENERATE<b> CHART</b>
            </button>
          </a>
        </div>

        <div className="delDiv">
          <Popup
            trigger={
              <button className="delChartBtn">
                DELETE <b>TABLE</b>{" "}
              </button>
            }
            modal
            closeOnDocumentClick>
            <div className="text-center">
              <b>Are you sure you want to delete {tableName} table?</b>
              <div className="my-3">
                Table data cannot be restored once deleted
              </div>
              <button className="delChartBtn" onClick={deleteTable}>
                CONFIRM <b>DELETE</b>
              </button>
            </div>
          </Popup>
        </div>
      </div>
    </Fragment>
  );
}
