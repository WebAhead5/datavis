import React, { Fragment } from 'react'
import { Bar, HorizontalBar, Line, Pie, Doughnut } from 'react-chartjs-2';
import chartPreview from '../../assets/images/combo-chart.png'



//Render of each chart type based on whats been selected & saved in state

const ChartDisplay = ({ chart, dataObject, optionsObject, x, y }) => {

    return (
        <React.Fragment>
            {
                chart === "bar" ?
                    <Bar
                        data={dataObject}
                        width={100}
                        height={50}
                        options={optionsObject}
                    />
                    : chart === "horizontal bar" ?
                        <HorizontalBar
                            data={dataObject}
                            width={100}
                            height={50}
                            options={optionsObject}
                        />
                        : chart === "line" || chart === "line only" ?

                            <Line
                                data={dataObject}
                                width={100}
                                height={50}
                                options={optionsObject}
                            />

                            : chart === "pie" ?

                                <Pie
                                    data={dataObject}
                                    width={100}
                                    height={50}
                                    options={optionsObject}
                                />


                                : chart === "doughnut" ?

                                    <Doughnut
                                        data={dataObject}
                                        width={100}
                                        height={50}
                                        options={optionsObject}
                                    />
                                    :
                                    <Fragment>
                                        <img src={chartPreview} className="chartIcon" />
                                        <div className="chartPreviewText"></div>
                                    </Fragment>

            }


        </React.Fragment>
    )
}

export default ChartDisplay