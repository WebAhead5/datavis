import React from 'react'

const ChooseData = ({ cols, setX, setY, setChart }) => {

    //Chart type drop down options
    const chartList = ["bar", "horizontal bar", "line", "line only", "pie", "doughnut"]

    return (
        <React.Fragment>
            {
                cols ?
                    <fieldset>
                        <legend> Pick X & Y Axis</legend>
                        <label htmlFor="axis"> </label>
                        <select className="" onChange={e => setX(e.target.value)}>
                            <option style={{ color: "grey" }}>Select</option>
                            {cols.map((col, index) => (
                                <option value={col} key={index}>{col}</option>
                            ))}
                        </select>
                        <select className="" onChange={e => setY(e.target.value)}>
                            <option style={{ color: "grey" }}>Select</option>
                            {cols.map((col, index) => (
                                <option value={col} key={index}>{col}</option>
                            ))}
                        </select>
                        <select className="" onChange={e => setChart(e.target.value)}>
                            <option style={{ color: "grey" }}>Select</option>
                            {chartList.map((chart, index) => (
                                <option value={chart} key={index}>{chart}</option>
                            ))}
                        </select>
                    </fieldset>


                    : <div></div>}

        </React.Fragment>

    )
}
export default ChooseData