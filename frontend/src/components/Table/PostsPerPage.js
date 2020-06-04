import React from "react";

const PostsPerPage = () => {
  return (
    <div className="postsPerPageCon">
      <label for="postsPerPage">Posts per page:</label>

      <select name="postsPerPage" className="optionsContainer">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
};

export default PostsPerPage;
