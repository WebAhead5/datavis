import React, { useState } from "react";


const PostsPerPage = ({setPostsPerPage}) => {


const handleSelect = (e) => {
   setPostsPerPage(e.target.value);
//    console.log(e.target.value);
   
}


  return (
    <div className="postsPerPageCon">
      <label for="postsPerPage">Posts per page:</label>
      <select onClick={handleSelect} name="postsPerPage" className="optionsContainer">
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
};

export default PostsPerPage;
