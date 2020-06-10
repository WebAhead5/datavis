
import React from 'react'

const Sort = ({ data, x, y, setArrayData, setArrayLabels }) => {

    const sortData = (axis, order) => {

        if (x && y) {

            //sort data before we map it
            let sortedData = data.sort(compareValues(axis, order))

            //Map data into correct arrays once sorted
            var mappedData = sortedData.map((row) => parseFloat(row[y].replace(/[&\/\\#,+()$£~%.'":*?<>{}]/g, "")))
            var mappedLabels = sortedData.map((row) => row[x])

            //Set data into state once sorted and mapped
            setArrayData(mappedData);
            setArrayLabels(mappedLabels)
        }

        //Call back function for sort
        function compareValues(key, order = 'asc') {
            console.log("SORTING kEY IS", key)
            console.log("TYPE OF KEY IS", typeof key)
            return function innerSort(a, b) {
                if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                    // property doesn't exist on either object
                    return 0;
                }

                //clean data for special chars (that would cause £$ to become strings not numbers for comparison)
                a[key].replace(/[&\/\\#,+()$£~%.'":*?<>{}]/g, "")
                b[key].replace(/[&\/\\#,+()$£~%.'":*?<>{}]/g, "")


                //turns strings either to uppercase, or to a number for comparison
                const varA = isNaN(a[key]) // if the string is NotANumber (NAN)
                    ? a[key].toUpperCase() : +a[key]; // uppercase it, else make it a number with '+'
                const varB = isNaN(b[key])
                    ? b[key].toUpperCase() : +b[key];

                //compare either strings or clean numbers
                let comparison = 0;
                if (varA > varB) {
                    comparison = 1;
                } else if (varA < varB) {
                    comparison = -1;
                }
                //if asc, return in order, is desc, retrun in reverse order
                return (
                    (order === 'desc') ? (comparison * -1) : comparison
                );
            };
        }

    }

    return (
        <div className="my-4 sort">
            <legend className=" sortLegend" > Sort Data</legend>
            <div className="sortBtns">
                {x ?
                    <React.Fragment>
                        <button className="btn btn-outline-secondary btnSize" onClick={() => sortData(x)}> by {x} <i class="fa fa-arrow-up" aria-hidden="true"></i></button>
                        <button className="btn btn-outline-secondary btnSize" onClick={() => sortData(x, "desc")}>by {x} <i class="fa fa-arrow-down" aria-hidden="true"></i></button>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <button className="btn btn-outline-secondary btnSize disabled" onClick={() => sortData(x)}>by {x} <i class="fa fa-arrow-up" aria-hidden="true"></i></button>
                        <button className="btn btn-outline-secondary btnSize disabled" onClick={() => sortData(x, "desc")}>by {x} <i class="fa fa-arrow-down" aria-hidden="true"></i> </button>
                    </React.Fragment>}

                {y ?
                    <React.Fragment>
                        <button className="btn btn-outline-secondary btnSize" onClick={() => sortData(y)}>by {y}  <i class="fa fa-arrow-up" aria-hidden="true"></i> </button>
                        <button className="btn btn-outline-secondary btnSize" onClick={() => sortData(y, "desc")}>by {y} <i class="fa fa-arrow-down" aria-hidden="true"></i></button>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <button className="btn btn-outline-secondary btnSize disabled" onClick={() => sortData(y)}>by {y} <i class="fa fa-arrow-up" aria-hidden="true"></i></button>
                        <button className="btn btn-outline-secondary btnSize disabled" onClick={() => sortData(y, "desc")}>by {y} <i class="fa fa-arrow-down" aria-hidden="true"></i> </button>
                    </React.Fragment>}

            </div>

        </div>
    )

}

export default Sort