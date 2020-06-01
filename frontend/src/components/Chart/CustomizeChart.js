import React from 'react'
// import { defaults } from 'react-chartjs-2';


const CustomizeChart = ({ x, y, setTheme, gridlines, setGridlines, darkMode, setDarkMode, title, setTitle, ytitle, xtitle, setxTitle, setyTitle }) => {

    //Theme drop down options
    const colorTheme = ["green", "red", "blue", "orange"]

    //Object that holds what each theme will look like
    const themeObject = {
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

    //Toggle Dark Mode
    const handleDarkMode = () => {
        setDarkMode(!darkMode)
    }

    //Toggle Show Gridlines
    const handleGridlines = () => {
        setGridlines(!gridlines)
    }

    return (
        <React.Fragment>

            {x || y ?
                <fieldset>
                    <legend>Pick Colors</legend>
                    <label htmlFor="chart"> </label>
                    <select className="" onChange={e => handleThemeChange(e)}>
                        <option style={{ color: "grey" }}>Select</option>
                        {colorTheme.map((col, index) => (
                            <option value={col} key={index}>{col}</option>
                        ))}
                    </select>

                    <legend>Dark Mode</legend>
                    <label htmlFor="chart"> </label>
                    <button onClick={handleDarkMode}>Dark Mode</button>

                    <legend>Gridlines</legend>
                    <label htmlFor="chart"> </label>
                    <button onClick={handleGridlines}>Gridlines</button>


                    <legend>Chart Title</legend>
                    Title:<input title={title} onChange={e => setTitle(e.target.value)} />
                    X:<input xtitle={xtitle} onChange={e => setxTitle(e.target.value)} />
                    Y:<input ytitle={ytitle} onChange={e => setyTitle(e.target.value)} />
                </fieldset>


                : <div></div>}




        </React.Fragment>
    )

}

export default CustomizeChart