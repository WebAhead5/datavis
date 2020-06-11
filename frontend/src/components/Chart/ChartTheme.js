import React from 'react'
import ReactTooltip from 'react-tooltip'
// import { defaults } from 'react-chartjs-2';


const ChartTheme = ({ x, y, setTheme }) => {

    //Theme drop down options
    const colorTheme = ["FireRed", "ElectricOrange", "SkyBlue", "OceanBlue", "EmeraldGreen", "Rainbow"]

    //Object that holds what each theme will look like
    const themeObject = {
        BrightPink: {
            "color1": "rgba(255,99,132,0.2)",
            "color2": "rgba(255,99,132,0.8)",
            "border": "rgba(255,99,132,1)",
            "hover": "rgba(255,99,132,0.4)",
            "pieColors": ["rgba(255,99,132,0.4)", "rgba(255,99,132,0.6)", "rgba(255,99,132,0.8)", "rgba(255,99,132,0.4)", "rgba(255,99,132,0.6)", "rgba(255,99,132,0.8)", "rgba(255,99,132,0.4)", "rgba(255,99,132,0.6)", "rgba(255,99,132,0.8)", "rgba(255,99,132,0.4)", "rgba(255,99,132,0.4)", "rgba(255,99,132,0.6)", "rgba(255,99,132,0.8)", "rgba(255,99,132,0.4)", "rgba(255,99,132,0.6)", "rgba(255,99,132,0.8)", "rgba(255,99,132,0.4)", "rgba(255,99,132,0.6)", "rgba(255,99,132,0.8)", "rgba(255,99,132,0.4)"],
        },
        EmeraldGreen: {
            "color1": "#71B280",
            "color2": "#134E5E",
            "border": "#3e7e44",
            "hover": "#8bb08b",
            "pieColors": ["#E6F69D", "#AADEA7", "#64C2A6", "#2D87BB", "#E6F69D", "#AADEA7", "#64C2A6", "#2D87BB", "#E6F69D", "#AADEA7", "#64C2A6", "#2D87BB", "#E6F69D", "#AADEA7", "#64C2A6", "#2D87BB", "#E6F69D", "#AADEA7", "#64C2A6", "#2D87BB", "#E6F69D", "#AADEA7", "#64C2A6", "#2D87BB"],
        },
        FireRed: {
            "color1": "orange",
            "color2": "red",
            "border": "darkred",
            "hover": "rgba(236, 107, 86)",
            "pieColors": ["#EC6B56", "#FFC154", "#47B39C", "#EC6B56", "#FFC154", "#47B39C", "#EC6B56", "#FFC154", "#47B39C", "#EC6B56", "#FFC154", "#47B39C", "#EC6B56", "#FFC154", "#47B39C", "#EC6B56", "#FFC154", "#47B39C", "#EC6B56", "#FFC154", "#47B39C", "#EC6B56", "#FFC154", "#47B39C"],
        },
        SkyBlue: {
            "color1": "#6DD5FA",
            "color2": "#2980B9",
            "border": "#2980B9",
            "hover": "rgba(0,0,139 ,0.7 )",
            "pieColors": ["#6DD5FA", "#2980B9", "rgba(0,0,139 ,0.7 )", "white", "#6DD5FA", "#2980B9", "rgba(0,0,139 ,0.7 )", "white", "#6DD5FA", "#2980B9", "rgba(0,0,139 ,0.7 )", "white", "#6DD5FA", "#2980B9", "rgba(0,0,139 ,0.7 )", "white", "#6DD5FA", "#2980B9", "rgba(0,0,139 ,0.7 )", "white", "#6DD5FA", "#2980B9", "rgba(0,0,139 ,0.7 )", "white", "#6DD5FA", "#2980B9", "rgba(0,0,139 ,0.7 )", "white", "#6DD5FA", "#2980B9", "rgba(0,0,139 ,0.7 )", "white"],
        },
        OceanBlue: {
            "color1": "lightblue",
            "color2": "darkblue",
            "border": "royalblue",
            "hover": "skyblue",
            "pieColors": ["#00008B", "#1F75FE", "#74BBFB", "#00008B", "#1F75FE", "#74BBFB", "#00008B", "#1F75FE", "#74BBFB", "#00008B", "#1F75FE", "#74BBFB", "#00008B", "#1F75FE", "#74BBFB", "#00008B", "#1F75FE", "#74BBFB", "#00008B", "#1F75FE", "#74BBFB", "#00008B", "#1F75FE", "#74BBFB", "#00008B", "#1F75FE", "#74BBFB", "#00008B", "#1F75FE", "#74BBFB", "#00008B", "#1F75FE", "#74BBFB", "#00008B", "#1F75FE", "#74BBFB"],
        },
        ElectricOrange: {
            "color1": "#ffd700",
            "color2": "#ff7f50",
            "border": "#ff7f50",
            "hover": "rgba(255,140,0 ,0.6 )",
            "pieColors": ["#FFEC21", "#93F03B", "#FFA32F", "#F54F52", "#FFEC21", "#93F03B", "#FFA32F", "#F54F52", "#FFEC21", "#93F03B", "#FFA32F", "#F54F52", "#FFEC21", "#93F03B", "#FFA32F", "#F54F52", "#FFEC21", "#93F03B", "#FFA32F", "#F54F52", "#FFEC21", "#93F03B", "#FFA32F", "#F54F52", "#FFEC21", "#93F03B", "#FFA32F", "#F54F52", "#FFEC21", "#93F03B", "#FFA32F", "#F54F52"],
        },
        Rainbow: {
            "color1": "#7C4DFF",
            "color2": "#1DE9B6",
            "border": "#7C4DFF",
            "hover": "rgba(29,233,182, 0.3)",
            "pieColors": ["#7C4DFF", "#1DE9B6", "rgba(124,77,255, 0.2)", "#7C4DFF", "#1DE9B6", "rgba(124,77,255, 0.2)", "#7C4DFF", "#1DE9B6", "rgba(124,77,255, 0.2)", "#7C4DFF", "#1DE9B6", "rgba(124,77,255, 0.2)", "#7C4DFF", "#1DE9B6", "rgba(124,77,255, 0.2)", "#7C4DFF", "#1DE9B6", "rgba(124,77,255, 0.2)", "#7C4DFF", "#1DE9B6", "rgba(124,77,255, 0.2)", "#7C4DFF", "#1DE9B6", "rgba(124,77,255, 0.2)"],
        }

    }

    //Set new theme state from theme object varibles based on selected theme
    const handleThemeChange = (e) => {
        let theme = e.target.value
        setTheme({
            ...theme,
            color1: themeObject[theme].color1,
            color2: themeObject[theme].color2,
            border: themeObject[theme].border,
            hover: themeObject[theme].hover,
            pieColors: themeObject[theme].pieColors
        })
    }


    return (
        <React.Fragment>


            <fieldset>
                <legend>Set Color Theme</legend>
                <label htmlFor="chart"> </label>
                <a data-tip="Set the colors for your chart from the pre-set themes available in the drop down menu">
                    <select className="select-css" onChange={e => handleThemeChange(e)}>
                        <option style={{ color: "grey" }}>BrightPink</option>
                        {colorTheme.map((col, index) => (
                            <option value={col} key={index}>{col}</option>
                        ))}
                    </select> </a>


            </fieldset>



        </React.Fragment>
    )

}

export default ChartTheme