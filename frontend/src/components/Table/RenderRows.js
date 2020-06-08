import React from 'react'
import RenderCells from "./RenderCells"

//Uses JSON object to render each row (per array item)
const RenderRows = ({ data, cols, setData, selectedTable }) => {

    return data.map((row, index) => {
        return <tr id={index} key={index}><RenderCells rowKey={index} selectedTable={selectedTable} data={row} cols={cols} setData={setData}  /></tr>
    })


}

export default RenderRows;





