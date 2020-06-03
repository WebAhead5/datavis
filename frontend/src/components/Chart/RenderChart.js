import React from 'react';
import ChartDisplay from './ChartDisplay'
import CustomizeChart from './CustomizeChart'
import ChooseData from './ChooseData'
import Sort from './Sort'
import './Chart.css'

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


    //get current table data
    React.useEffect(() => {
        setData(JSON.parse(localStorage.getItem("tabledata")))
        setCols(JSON.parse(localStorage.getItem("cols")))
    }, [])

    React.useEffect(() => {
        console.log("data is currently", data, "cols currently", cols)
    }, [data])

    //Map ther correct data to the Axis in the right format for chart JS (on x or y axis change)
    React.useEffect(() => {
        if (data && y && x) {
            var mappedData = data.map((row) => parseFloat(row[y].replace(/[&\/\\#,+()$£~%.'":*?<>{}]/g, "")))
            var mappedLabels = data.map((row) => row[x])

            setArrayData(mappedData);
            setArrayLabels(mappedLabels)

            console.log("array data", arrayData, "label data", arrayLabels)
        }
    }, [data, x, y]);

    //Theme of Chart state - defaults below
    const [theme, setTheme] = React.useState({
        color1: "rgba(255,99,132,0.2)",
        color2: "rgba(255,99,132,0.8)",
        border: "rgba(255,99,132,1)",
        hover: "rgba(255,99,132,0.4)",
        pieColors: ["rgba(255,99,132,0.4)", "rgba(255,99,132,0.6)", "rgba(255,99,132,0.8)", "rgba(255,99,132,0.4)", "rgba(255,99,132,0.6)", "rgba(255,99,132,0.8)", "rgba(255,99,132,0.4)", "rgba(255,99,132,0.6)", "rgba(255,99,132,0.8)", "rgba(255,99,132,0.4)"],
    })


    //All customize props to pass into componant
    const customizeProps = { setTheme, gridlines, setGridlines, darkMode, setDarkMode, title, setTitle, xtitle, ytitle, setxTitle, setyTitle }

    //make the data object a Canvas so we can use gradients
    const dataObject = canvas => {
        const ctx = canvas.getContext('2d');
        let width = window.innerWidth
        let gradientStroke = ctx.createLinearGradient(0, 0, width, 400);
        gradientStroke.addColorStop(0, theme.color2);
        gradientStroke.addColorStop(1, theme.color1);

        //Data Object for CHART JS
        return {
            labels: arrayLabels,
            datasets: [
                {
                    label: y,
                    backgroundColor: chart === "pie" || chart === "doughtnut" ? theme.pieColors : gradientStroke,
                    borderColor: chart === "line only" ? gradientStroke : theme.border,
                    borderWidth: chart === "line only" ? 5 : 1,
                    hoverBackgroundColor: theme.hover,
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    fill: chart === "line only" ? false : true,
                    data: arrayData
                }
            ]
        };
    }

    //Set DarkMode options
    let bgColor = "inherit"
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
            chart !== "pie" && chart !== "doughnut" ? {
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


    return (
        <div className="chartDiv">

            <ChooseData cols={cols} setX={setX} setY={setY} setChart={setChart} />

            <Sort data={data} x={x} y={y} setArrayData={setArrayData} setArrayLabels={setArrayLabels} />

            <CustomizeChart x={x} y={y} {...customizeProps} />

            <div style={{ backgroundColor: bgColor }}>
                <ChartDisplay chart={chart} dataObject={dataObject} optionsObject={optionsObject} />
            </div>
        </div>
    );
}

export default RenderChart;
