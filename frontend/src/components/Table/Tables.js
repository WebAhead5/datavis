import React, { useEffect, useState } from "react";
import UserBar from "../UserBar/UserBar";
import RenderTable from "./RenderTable";

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
  const [tableList, setTableList] = useState([1, 2, 3]);

  ///// Pagination statess  /////
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(20);
  const [dataVars, setDataVars] = useState({ cols, data, setData });
//   const [loading, setLoading] = useState(false);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  /////                     /////
  
  
//   let dataVars = { cols, data, setData };
  
  //select data once table selected
  useEffect(() => {
      
      let extractedData = "";
      if (selectedTable !== "") {
          tableList.forEach((row) => {
              if (row.table_id === parseInt(selectedTable)) {
                  extractedData = JSON.parse(row.data);
                  
                }
            });
            
            //   console.log("ex data", extractedData);
            setData(extractedData);
            
            localStorage.setItem("tabledata", JSON.stringify(extractedData));
            console.log("table selected is", extractedData);
            
            let keys = Object.keys(extractedData[0]);
            // console.log('extea' , extractedData[0]);
            setCols(keys);
            localStorage.setItem("cols", JSON.stringify(keys));
        }
            console.log(1);
            console.log("DATA FOR TABLE IS", extractedData);

        if(data){
           console.log('sliced data', data.slice(0,9));
        }
    }, [selectedTable]);


    
    console.log('dataVars' ,dataVars);
    console.log('data is', data);
    
    // const currentSlicedPosts = data.slice(indexOfFirstPost, indexOfLastPost);


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

  //run above code when dashboard loads
  useEffect(() => {
    getTables();
  }, []);


  useEffect(() => {
    setDataVars({ ...dataVars,data})
  }, [data]);
  //Get current posts


  //   const pagingTables = () => {

  //     useEffect(() => {

  //         const fetchPosts = async () => {
  //             setLoading(true);
  //             const res = await fetch('http://localhost:4000/table/getTables');
  //             console.log('res.data log',res.data);

  //             setPosts(res.data);
  //             setLoading(false);
  //         }
  //     pagingTables();
  //     }, []);

  //     console.log(posts);
  //   };

  return (
    <div>
      <UserBar name={name} setName={setName} setLoggedIn={setLoggedIn} />
      <h1 className="text-center mt-5">TABLES</h1>
      <h3>display exisiting user tables here or in drop down</h3>

      <fieldset>
        <legend> Select Table</legend>
        <label htmlFor="table"> </label>
        <select className="" onChange={(e) => setSelectedTable(e.target.value)}>
          <option style={{ color: "grey" }} value='' disabled selected >Select your table </option>
          {tableList.map((tableList, index) => (
            <option value={tableList.table_id} key={index}>
              {tableList.table_name}
            </option>
          ))}
        </select>
      </fieldset>

      {dataVars.data ? (
        <div>
          <a href="/createChart">
            <button className="genChartBtn">Generate Chart!</button>
          </a>
          <RenderTable {...dataVars} />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
