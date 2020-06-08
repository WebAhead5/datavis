import React from "react";

//uses keys from JSON to render the table headings
const RenderCols = ({ cols }) => {
  let listCols = cols.map((key) => (
    <th scope="col" className={key==="uID" ? "hiddenCol": ""} key={key}>
      {key}
    </th>
  ));
  return (
    <tr
      contentEditable={cols == "id" ? false : true}
      suppressContentEditableWarning="true"
      style={{ textTransform: "uppercase" }}>
      {listCols}
    </tr>
  );
};

export default RenderCols;
