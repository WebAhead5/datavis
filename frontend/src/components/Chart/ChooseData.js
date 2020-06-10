import React from 'react'
import ReactTooltip from 'react-tooltip'

const ChooseData = ({ cols, setX, setY, setChart }) => {



    return (
        <React.Fragment>
            {
                cols ?
                    <fieldset>
                        <div>
                            <legend> Pick The Data You Want To Use</legend>
                            <a data-tip="Data to use for X axis (at the bottom of the chart)"><label htmlFor="axis"> </label>
                                <select className="select-css" onChange={e => setX(e.target.value)}>
                                    <option style={{ color: "grey" }}>Select X Axis</option>
                                    {cols.map((col, index) => (
                                        col !== "uID" ? <option value={col} key={index}>{col}</option> : null
                                    ))}
                                </select></a>

                        </div>
                        <div>
                            <a data-tip="Data to use for Y axis (at the left side of the chart)"><select className="select-css" onChange={e => setY(e.target.value)}>
                                <option style={{ color: "grey" }}>Select Y Axis</option>
                                {cols.map((col, index) => (
                                    col !== "uID" ? <option value={col} key={index}>{col}</option> : null
                                ))}
                            </select></a>
                            <ReactTooltip place="right" type="dark" effect="solid" />
                        </div>


                    </fieldset>


                    : <div></div>}

        </React.Fragment>

    )
}
export default ChooseData