import React, { Fragment } from 'react'
import { Bar, HorizontalBar, Line, Pie, Doughnut } from 'react-chartjs-2';
import chartPreview from '../../assets/images/combo-chart.png'



//Render of each chart type based on whats been selected & saved in state

const ChartDisplay = ({ chart, dataObject, optionsObject, x, y }) => {

    return (
        <React.Fragment>

            {
                chart === "Bar" ?
                    <Bar
                        data={dataObject}
                        width={500}
                        height={350}
                        options={optionsObject}
                    />
                    : chart === "HorizontalBar" ?
                        <HorizontalBar
                            data={dataObject}
                            width={500}
                            height={350}
                            options={optionsObject}
                        />
                        : chart === "Area" || chart === "Line" ?

                            <Line
                                data={dataObject}
                                width={500}
                                height={350}
                                options={optionsObject}
                            />

                            : chart === "Pie" ?

                                <Pie
                                    data={dataObject}
                                    width={500}
                                    height={350}
                                    options={optionsObject}
                                />


                                : chart === "Doughnut" ?

                                    <Doughnut
                                        data={dataObject}
                                        width={500}
                                        height={350}
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