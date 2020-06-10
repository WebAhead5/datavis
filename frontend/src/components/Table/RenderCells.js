import React from "react";
import EditCell from './EditCell'

//function to render each indivdual cell in each row
const RenderCells = ({ cols, data, setData, rowKey, selectedTable }) => {
  //TODO: finsih this function so it works on edit

  //Function to save current & changed states and update data state
  const handleEdit = (e) => {
    e.persist();
    // console.log("THIS IS THE EVENT", e)
    // console.log("content", e.target.innerText, e.target.id, e.target.parentNode.id)
    let clickedKey = e.target.id;
    let clickedIndex = e.target.parentNode.id;
    let savedText = e.target.innerText;
    // console.log(data[clickedKey], "to", savedText)

    // setData(data => [...data, data { clickedIndex: savedText }])
    // console.log("NEW DATA IS", data)
    //spread data, spread cols, then change col text
    // setData(data => ({ data[clickedIndex].clickedKey = savedText })
    //)
  };




  return cols.map((col, index) => {
    return (
      <td
        id={cols[index]}
        id={data[col]}
        contentEditable={cols[index] === "id" ? "false" : "true"}
        onBlur={(e) => {
          let newValueOfCell = document.getElementById(`${data[col]}`).innerHTML
          let columnName = cols[index]
          let rowNum = document.querySelector(`.rowNum${rowKey}`).classList[1]
          console.log('event at renderCells', e);
          
          EditCell({ newValueOfCell, columnName, rowNum, selectedTable })
          e.target.className="editedCell"
          //need to find unique valid identifier in order to get the element 
          //and get the innerHTML of it after input 
          //ID doesnt have any limitation, compared to classNames, https://html.spec.whatwg.org/multipage/dom.html#the-id-attribute
          console.log(
            "the text first was: ", data[col] + ' at the place ' + cols[index], "{inner html} and after the change it's ", newValueOfCell);
        }}
        suppressContentEditableWarning="true"
        className={`${data[col]} rowNum${rowKey} ${cols[index] === 'uID' ? 'hiddenCol' : ''}`}
        key={data[col]}>
        {data[col]}
      </td>
    );
  });
};

export default RenderCells;
