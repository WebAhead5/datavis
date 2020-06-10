import React from 'react'
import ReactTooltip from 'react-tooltip'

export default function ChartTitles({ title, setTitle, ytitle, xtitle, setxTitle, setyTitle }) {
    return (
        <div>

            <legend>Label Your Chart</legend>
            <div>
                <a data-tip="Title to use at the top of your chart">
                    <input className="titleInput" Placeholder="Chart title" title={title} onChange={e => setTitle(e.target.value)} /></a>
                <ReactTooltip place="right" type="dark" effect="solid" />
            </div>
            <div>
                <a data-tip="Title to use for X axis (at the bottom of the chart)">  <input className="titleInput" Placeholder="X Axis Title" xtitle={xtitle} onChange={e => setxTitle(e.target.value)} /></a>
                <ReactTooltip place="right" type="dark" effect="solid" />
            </div>
            <div> <a data-tip="Title to use for Y axis (at the left side of the chart)">
                <input className="titleInput" Placeholder="Y Axis Title" ytitle={ytitle} onChange={e => setyTitle(e.target.value)} /></a>
                <ReactTooltip place="right" type="dark" effect="solid" />
            </div>

        </div>
    )
}
