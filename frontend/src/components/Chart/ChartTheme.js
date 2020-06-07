import React from 'react'
// import { defaults } from 'react-chartjs-2';


const ChartTheme = ({ x, y, setTheme }) => {

    //Theme drop down options
    const colorTheme = ["green", "red", "blue", "orange"]

    //Object that holds what each theme will look like
    const themeObject = {
        default: {
            "color1": "rgba(255,99,132,0.2)",
            "color2": "rgba(255,99,132,0.8)",
            "border": "rgba(255,99,132,1)",
            "hover": "rgba(255,99,132,0.4)",
            "pieColors": ["rgba(255,99,132,0.4)", "rgba(255,99,132,0.6)", "rgba(255,99,132,0.8)", "rgba(255,99,132,0.4)", "rgba(255,99,132,0.6)", "rgba(255,99,132,0.8)", "rgba(255,99,132,0.4)", "rgba(255,99,132,0.6)", "rgba(255,99,132,0.8)", "rgba(255,99,132,0.4)"],
        },
        green: {
            "color1": "green",
            "color2": "darkgreen",
            "border": "darkgreen",
            "hover": "lightgreen",
            "pieColors": ["green", "teal", "lightgreen", "green", "teal", "lightgreen", "green", "teal", "lightgreen", "green", "teal", "lightgreen", "green", "teal", "lightgreen"],
        },
        red: {
            "color1": "orange",
            "color2": "red",
            "border": "darkred",
            "hover": "pink",
            "pieColors": [],
        },
        blue: {
            "color1": "lightblue",
            "color2": "darkblue",
            "border": "royalblue",
            "hover": "skyblue",
            "pieColors": [],
        },
        orange: {
            "color1": "yellow",
            "color2": "darkorange",
            "border": "crimson",
            "hover": "yellow",
            "pieColors": [],
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
                <select className="" onChange={e => handleThemeChange(e)}>
                    <option style={{ color: "grey" }}>default</option>
                    {colorTheme.map((col, index) => (
                        <option value={col} key={index}>{col}</option>
                    ))}
                </select>


            </fieldset>



        </React.Fragment>
    )

}

export default ChartTheme