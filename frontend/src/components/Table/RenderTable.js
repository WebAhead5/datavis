import React from 'react'
import RenderCols from './RenderCols'
import RenderRows from './RenderRows'

const RenderTable = ({ cols, data, setData }) => {

  return (
    <table className="table table-striped tbl">
      <thead className="thead-dark">
        <RenderCols cols={cols} />
      </thead>
      <tbody>
        <RenderRows data={data} cols={cols} setData={setData} />
      </tbody>
    </table>
  )
}

export default RenderTable
