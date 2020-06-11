import React, { Fragment } from 'react';
import ChartDisplay from './ChartDisplay'
import CustomizeChart from './ChartTheme'
import ChooseData from './ChooseData'
import ShowChart from './ShowChart'
import Sort from './Sort'
import ChartTitles from './ChartTitles'
import './Chart.css'
import ReactTooltip from 'react-tooltip'

const RenderChart = ({ data, setData, cols, setCols, x, y, setX, setY }) => {

    //Set the data on the X (labels) and Y (data) axis states
    const [arrayLabels, setArrayLabels] = React.useState([["test", "test2", "test3"]])
    const [arrayData, setArrayData] = React.useState([20, 50, 60])

    //Chart type state
    const [chart, setChart] = React.useState("")

    //Dark Mode state
    const [darkMode, setDarkMode] = React.useState(false)

    //Gridlines state
    const [gridlines, setGridlines] = React.useState("black")

    //Title state
    const [title, setTitle] = React.useState("please enter chart title")
    const [xtitle, setxTitle] = React.useState("")
    const [ytitle, setyTitle] = React.useState("")

    //Theme of Chart state - defaults below
    const [theme, setTheme] = React.useState({
        color1: "rgba(255,99,132,0.2)",
        color2: "rgba(255,99,132,0.8)",
        border: "rgba(255,99,132,1)",
        hover: "rgba(255,99,132,0.4)",
        pieColors: ["rgba(255,99,132,0.4)", "rgba(255,99,132,0.6)", "rgba(255,99,132,0.8)", "rgba(255,99,132,0.4)", "rgba(255,99,132,0.6)", "rgba(255,99,132,0.8)", "rgba(255,99,132,0.4)", "rgba(255,99,132,0.6)", "rgba(255,99,132,0.8)", "rgba(255,99,132,0.4)", "rgba(255,99,132,0.4)", "rgba(255,99,132,0.6)", "rgba(255,99,132,0.8)", "rgba(255,99,132,0.4)", "rgba(255,99,132,0.6)", "rgba(255,99,132,0.8)", "rgba(255,99,132,0.4)", "rgba(255,99,132,0.6)", "rgba(255,99,132,0.8)", "rgba(255,99,132,0.4)"],
    })


    //get current table data
    React.useEffect(() => {
        setData(JSON.parse(localStorage.getItem("tabledata")))
        setCols(JSON.parse(localStorage.getItem("cols")))
    }, [])

    //Map ther correct data to the Axis in the right format for chart JS (on x or y axis change)
    React.useEffect(() => {
        if (data && y && x) {
            var mappedData = data.map((row) => parseFloat(row[y].replace(/[&\/\\#,+()$£~%.'":*?<>{}]/g, "")))
            var mappedLabels = data.map((row) => row[x])

            setArrayData(mappedData);
            setArrayLabels(mappedLabels)

        }
    }, [data, x, y, theme]);




    //All customize props to pass into componant
    const customizeProps = { setTheme, gridlines, setGridlines, darkMode, setDarkMode, title, setTitle, xtitle, ytitle, setxTitle, setyTitle }

    const [currentPage, setCurrentPage] = React.useState('createChart')

    const changePage = () => {

        if (currentPage === 'createChart') setCurrentPage('showChart')
        else setCurrentPage('createChart')
    }

    //Toggle Dark Mode
    const handleDarkMode = () => {
        setDarkMode(!darkMode)
    }

    //Toggle Show Gridlines
    const handleGridlines = () => {
        setGridlines(!gridlines)
    }


    //make the data object a Canvas so we can use gradients
    const dataObject = canvas => {
        const ctx = canvas.getContext('2d');
        let width = window.innerWidth
        //adjust gradient for prview mode
        if (currentPage === "createChart") width = width / 2
        let gradientStroke = ctx.createLinearGradient(0, 0, width, 400);
        gradientStroke.addColorStop(0, theme.color2);
        gradientStroke.addColorStop(0.65, theme.color1);
        gradientStroke.addColorStop(1, "white");

        //Data Object for CHART JS
        return {
            labels: arrayLabels,
            datasets: [
                {
                    label: y,
                    backgroundColor: chart === "Pie" || chart === "Doughnut" ? theme.pieColors : gradientStroke,
                    borderColor: chart === "Line" ? gradientStroke : theme.border,
                    borderWidth: chart === "Line" ? 5 : 1,
                    hoverBackgroundColor: theme.hover,
                    hoverBorderColor: theme.color1,
                    fill: chart === "Line" ? false : true,
                    data: arrayData,
                }
            ]
        };
    }

    //Set DarkMode options
    let bgColor = "rgb(255,255,255, 0.4)"
    let fColor = "#212529"
    let fStyle = "normal"
    if (darkMode) {
        bgColor = "#263238"
        fColor = "#acbbc2"
        fStyle = "bold"
    }

    //Options Object for CHART JS
    const optionsObject = {
        responsive: true,
        datasetStrokeWidth: 3,
        pointDotStrokeWidth: 4,
        tooltipFillColor: "rgba(0,0,0,0.8)",
        tooltipFontStyle: "bold",
        maintainAspectRatio: true,
        layout: {
            padding: 10,
        },
        legend: {
            position: 'top',
            labels: {
                fontColor: fColor,
            }

        },
        title: {
            display: true,
            text: title,
            fontColor: fColor,
            fontSize: 28,
        },
        scales:
            chart !== "Pie" && chart !== "Doughnut" ? {
                yAxes: [
                    {
                        ticks: {
                            fontColor: fColor,
                            fontSyle: fStyle,
                        },
                        scaleLabel: {
                            display: true,
                            labelString: ytitle,
                            fontColor: fColor,
                            fontSize: 18,
                        },
                        gridLines: {
                            display: gridlines
                        },
                    }
                ],
                xAxes: [
                    {
                        ticks: {
                            fontColor: fColor,
                            fontSyle: fStyle,
                        },
                        scaleLabel: {
                            display: true,
                            labelString: xtitle,
                            fontColor: fColor,
                            fontSize: 18,
                        },
                        gridLines: {
                            display: gridlines
                        },
                    }
                ]
            } : {} //else no settings for pie & doughtnut
    }
    //Chart type drop down options
    const chartList = ["Bar", "HorizontalBar", "Area", "Line", "Pie", "Doughnut"]

    return (

        <Fragment>
            <h1 className="text-center mt-5 mb-4">
                {currentPage === 'createChart' ? "CREATE" : "YOUR"}<b> CHART</b>
            </h1>

            <div className="chartDiv">
                {
                    currentPage === 'createChart' ?

                        <Fragment>


                            <div class="splitScreen">
                                <div className="left">
                                    {/* <div>Table Selected: <b>table name </b></div> */}
                                    <ChooseData cols={cols} setX={setX} setY={setY} setChart={setChart} />




                                    <div classname="selectChart">
                                        <legend> Pick Your Chart Type</legend>

                                        <div className="radioBtns" style={{ width: "300px" }}>


                                            {chartList.map((chart, index) => (
                                                <a data-tip="Pick the type of chart you would like to use to display your data">
                                                    <div className="form-check" onChange={e => setChart(e.target.value)}>
                                                        <input key={index} type="radio" className="form-check-input" name="chart" value={chart} />
                                                        <label key={index} className="form-check-label mx-2" for={chart}>{chart}</label>
                                                    </div>
                                                </a>
                                            ))}

                                        </div>
                                        <ReactTooltip place="right" type="dark" effect="solid" />
                                    </div>


                                    <ChartTitles {...customizeProps} />



                                    <CustomizeChart x={x} y={y} {...customizeProps} />
                                    <div>
                                        {chart && x && y ?
                                            <Fragment>
                                                <div><a data-tip="Dark Mode turns the background a darker colour and the text a lighter color, click to toggle">
                                                    <button onClick={handleDarkMode} className={darkMode ? "btn btn-dark mt-5 btnSize2" : "btn btn-outline-secondary mt-5 btnSize2"} data-toggle="button" >Dark Mode {darkMode ? "On" : "Off"}</button></a>
                                                </div>
                                                <div className="gridDiv"><a data-tip="Turn the gridlines in the background on and off, click to toggle">
                                                    <button onClick={handleGridlines} className={gridlines ? "btn btn-secondary mt-3 mb-2 btnSize2" : "btn btn-outline-secondary mt-3 mb-2 btnSize2"} data-toggle="button"  >Gridlines {gridlines ? "On" : "Off"} </button></a>
                                                </div>
                                            </Fragment>
                                            :
                                            <Fragment>
                                                <div><a data-tip="Dark Mode turns the background a darker colour and the text a lighter color, click to toggle">
                                                    <button className="btn btn-secondary disabled mt-5 btnSize2" >Dark Mode {darkMode ? "On" : "Off"}</button></a>
                                                </div>
                                                <div className="gridDiv">
                                                    <a data-tip="Turn the gridlines in the background on and off, click to toggle">
                                                        <button className="btn btn-secondary disabled mt-3 mb-2 btnSize2 " >Gridlines {gridlines ? "On" : "Off"}</button></a>
                                                </div>
                                            </Fragment>}
                                    </div>


                                </div>


                                <div className="right text-center" >
                                    <div>
                                        <div className="chartPreview">
                                            <div className="chartSize" style={{ backgroundColor: bgColor }}>
                                                <ChartDisplay chart={chart} dataObject={dataObject} optionsObject={optionsObject} x={x} y={y} />
                                            </div>
                                        </div>
                                        <Sort data={data} x={x} y={y} setArrayData={setArrayData} setArrayLabels={setArrayLabels} />

                                        {chart && x && y ?
                                            <Fragment>
                                                <button onClick={changePage} className="saveChartBtn mt-4">CREATE <b>CHART</b></button>
                                            </Fragment>
                                            :
                                            <Fragment>
                                                <button className="disabledChartBtn mt-4">CREATE <b>CHART</b></button>
                                            </Fragment>}
                                        <div className="displayBtns">



                                        </div>
                                    </div>
                                </div>


                            </div>

                        </Fragment>

                        :

                        <Fragment>
                            <ShowChart setCurrentPage={setCurrentPage} chart={chart} dataObject={dataObject} optionsObject={optionsObject} bgColor={bgColor} />
                        </Fragment>
                }
            </div>
        </Fragment>
    );
}

export default RenderChart;
