import React from "react";
import EditCell from './EditCell'

//function to render each indivdual cell in each row
const RenderCells = ({ cols, data, setData }) => {
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




  // const editCell = (newValueOfCell) => {
  //   setTimeout(() => {
  //     // console.log(1, newValueOfCell.newValueOfCell);
  //   }, 200); 
  // }



  //   const _handleFocus = (text) => {
  //     console.log('Focused with text: ' + data[cols]);
  // }

  // const _handleFocusOut = (text) => {
  //     console.log('Left editor with text: ' + text);
  // }

  return cols.map((col, index) => {
    return (
      <td
        id={cols[index]}
        id={data[col]}
        contentEditable={cols[index] === "id" ? "false" : "true"}
        // onFocus={_handleFocus}
        // onFocusOut={_handleFocusOut}
        onInput={() => {
          let newValueOfCell = document.getElementById(`${data[col]}`).innerHTML
          let columnName = cols[index]
          
          console.log(window.localStorage)
          
          EditCell({newValueOfCell, columnName})
          
          //need to find unique valid identifier in order to get the element 
          //and get the innerHTML of it after input 
          //ID doesnt have any limitation, compared to classNames, https://html.spec.whatwg.org/multipage/dom.html#the-id-attribute
          console.log(
            "the text first was: ",data[col] + 'at the place ' + cols[index],"{inner html} and after the change it's ", newValueOfCell);
            // document.querySelector(`aa${data[col]}`).innerHTML
            
        }}
        suppressContentEditableWarning="true"
        onBlur={(e) => handleEdit(e)}
        className={`aa${data[col]}`}
        key={data[col]}>
        {data[col]}
      </td>
    );
  });
};

export default RenderCells;
