import React from 'react'

const ChooseData = ({ cols, setX, setY, setChart }) => {



    return (
        <React.Fragment>
            {
                cols ?
                    <fieldset>
                        <div>
                            <legend> Pick The Data You Want To Use</legend>
                            <label htmlFor="axis"> </label>
                            X: <select className="" onChange={e => setX(e.target.value)}>
                                <option style={{ color: "grey" }}>Select X Axis</option>
                                {cols.map((col, index) => (
                                    <option value={col} key={index}>{col}</option>
                                ))}
                            </select>

                        </div>
                        <div>
                            Y: <select className="" onChange={e => setY(e.target.value)}>
                                <option style={{ color: "grey" }}>Select Y Axis</option>
                                {cols.map((col, index) => (
                                    <option value={col} key={index}>{col}</option>
                                ))}
                            </select>
                        </div>


                    </fieldset>


                    : <div></div>}

        </React.Fragment>

    )
}
export default ChooseData