import React, { useState, useEffect } from "react";
import UserBar from "../UserBar/UserBar";
import RenderTable from "./RenderTable";
import { toast } from "react-toastify";
import Popup from "reactjs-popup";
import Pagination from "./Pagination";
import PostsPerPage from "./PostsPerPage";


export default function Tables({
  name,
  setName,
  setLoggedIn,
  data,
  setData,
  cols,
  setCols,
}) {
  const [selectedTable, setSelectedTable] = useState("");
  const [tableName, setTableName] = useState("");
  const [tableList, setTableList] = useState([1, 2, 3]);

  const [displayedRows, setDisplayedRows] = useState([]);

  ///// Pagination statess  /////
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(20);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  /////                     /////
  const paginate = (pageNumber) => setCurrentPage(currentPage);

  //select data once table selected
  useEffect(() => {
    let extractedData = "";
    let currentSlicedRows;
    if (selectedTable !== "") {
      console.log(selectedTable);

      tableList.forEach((row) => {
        if (row.table_id === parseInt(selectedTable)) {
          extractedData = JSON.parse(row.data);
        }
      });

      //   console.log("ex data", extractedData);
      setData(extractedData);
      console.log("this is the data", data);

      localStorage.setItem("tabledata", JSON.stringify(extractedData));
      console.log("table selected is", extractedData);

      let keys = Object.keys(extractedData[0]);
      // console.log('extea' , extractedData[0]);
      setCols(keys);
      localStorage.setItem("cols", JSON.stringify(keys));
    }


    //if there is data then slice the first slice of rows
    // that should be displayed according to the posts per page value
    if (extractedData) {
      // console.log(15555);

      currentSlicedRows = extractedData.slice(
        indexOfFirstPost,
        indexOfLastPost
      );
      // console.log(currentSlicedRows);

      
      //set displayed rows to the new slice 
            setDisplayedRows(currentSlicedRows);
            // console.log("displayed rows for table", displayedRows);
          }



    tableList.forEach((row) => {
      if (row.table_id === parseInt(selectedTable)) {
        setTableName(row.table_name);
      }
    });
  }, [selectedTable]);

  //function to get info for dashboard based on ID in JWT token
  const getTables = async () => {
    try {
      //call API for user infomation for use in tables page
      const res = await fetch("http://localhost:4000/table/getTables", {
        method: "POST",
        headers: { jwt_token: localStorage.token },
      });

      //result from DB request on backend - will send default info
      const parseData = await res.json();
      console.log("table data", parseData);
      setTableList(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTables();
  }, []);

  const deleteTable = async () => {
    try {
      let table_id = selectedTable;
      console.log("del table clicked, id", selectedTable);
      const body = { table_id };
      //call API for user infomation for use in dashboard
      const res = await fetch("http://localhost:4000/table/delete", {
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
      getTables();
      localStorage.removeItem("tabledata");
      setData(null);
    } catch (err) {
      console.error(err.message);
      toast.info(`${selectedTable} could not be deleted!`);
    }
  };

  return (
    <div>
      <UserBar name={name} setName={setName} setLoggedIn={setLoggedIn} />
      <h1 className="text-center mt-5">
        YOUR <b>TABLES</b>
      </h1>
      <div className="text-center mt-4">
        <span>Please select a table to work from </span>
        <label htmlFor="table"> </label>
        <select
          className=""
          defaultValue="select"
          onChange={(e) => setSelectedTable(e.target.value)}>
          <option style={{ color: "grey" }}>Select you table</option>
          {tableList.map((tableList, index) => (
            <option value={tableList.table_id} key={index}>
              {tableList.table_name}
            </option>
          ))}
        </select>
      </div>

      {data ? (
        <div>
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
          <div className="pagination-container">
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={data.length}
            paginate={paginate}
            setDisplayedRows={setDisplayedRows}
            indexOfFirstPost={indexOfFirstPost}
            data={data}
            setPostsPerPage={setPostsPerPage}
          />
          </div>
          <div className="tableDiv">
            <RenderTable data={displayedRows} setData={setData} cols={cols} />
          </div>
          <div className="pagination-container">
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={data.length}
            paginate={paginate}
            setDisplayedRows={setDisplayedRows}
            data={data}
          />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
