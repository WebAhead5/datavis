import React from 'react'

//function to render each indivdual cell in each row
const RenderCells = ({ cols, data, setData }) => {

    //TODO: finsih this function so it works on edit

    //Function to save current & changed states and update data state
    const handleEdit = (e) => {
        e.persist()
        // console.log("THIS IS THE EVENT", e)
        console.log("content", e.target.innerText, e.target.id, e.target.parentNode.id)
        let clickedKey = e.target.id
        let clickedIndex = e.target.parentNode.id
        let savedText = e.target.innerText
        console.log(data[clickedKey], "to", savedText)

        // setData(data => [...data, data { clickedIndex: savedText }])
        // console.log("NEW DATA IS", data)
        //spread data, spread cols, then change col text
        // setData(data => ({ data[clickedIndex].clickedKey = savedText })
        //)
    }

    return cols.map((col, index) => {
        return <td id={cols[index]} contentEditable='true' suppressContentEditableWarning="true" onBlur={(e) => handleEdit(e)} key={data[col]}>{data[col]}</td>
    })
}


export default RenderCells;