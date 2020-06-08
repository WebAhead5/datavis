
import React, { useState, useEffect, Fragment } from "react";
import UserBar from "../UserBar/UserBar";
import RenderTable from "./RenderTable";

import Pagination from "./Pagination";
import PostsPerPage from "./PostsPerPage";
import TableButtons from './TableButtons'
import getTables from '../../utils/getTables'

export default function Tables({ name, setName, setLoggedIn, data, setData, cols, setCols, tableList, setTableList }) {
  const [selectedTable, setSelectedTable] = useState("");
  const [tableName, setTableName] = useState("");

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
      

      tableList.forEach((row) => {
        
        if (row.table_id === parseInt(selectedTable)) {
          extractedData = row.data
        }
      })


      let dataVars = { cols, data, setData }

      setData(extractedData);

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
      currentSlicedRows = extractedData.slice(
        indexOfFirstPost,
        indexOfLastPost
      );

      //set displayed rows to the new slice 
      setDisplayedRows(currentSlicedRows);
      // console.log("displayed rows for table", displayedRows);
    }


    tableList.forEach((row) => {
      if (row.table_id === parseInt(selectedTable)) {
        setTableName(row.table_name);
      }
    });



  }, [selectedTable, postsPerPage]);


  useEffect(() => {
    getTables(setTableList)
  }, []);




  return (
    <div>
      <UserBar name={name} setName={setName} setLoggedIn={setLoggedIn} />
      <h1 className="text-center mt-5">YOUR <b>TABLES</b></h1>
      <div className="text-center mt-4">
        <span>Please select a table to work from  </span>
        <label htmlFor="table"> </label>
        <select className="" defaultValue onChange={e => setSelectedTable(e.target.value)}>
          <option style={{ color: "grey" }} disabled  >Select</option>
          {tableList.map((tableList, index) => (
            <option value={tableList.table_id} key={index}>{tableList.table_name}</option>
          ))}
        </select>
      </div>



      {data && selectedTable ?
        <Fragment>
          <div className="tableControls">
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
            <TableButtons setData={setData} selectedTable={selectedTable} tableList={tableList} tableName={tableName} setTableName={setTableName} setTableList={setTableList} />
          </div>
          <div className="tableDiv">
            <RenderTable data={displayedRows} setData={setData} cols={cols} />
          </div>
        </Fragment>

        :
        <div></div>}
    </div>
  );
}
