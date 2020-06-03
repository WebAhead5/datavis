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

{/* <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table> */}