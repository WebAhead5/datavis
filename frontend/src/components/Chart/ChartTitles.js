import React from 'react'

export default function ChartTitles({ title, setTitle, ytitle, xtitle, setxTitle, setyTitle }) {
    return (
        <div>

            <legend>Label Your Chart</legend>
            <div>
                <input Placeholder="Chart title" title={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div>
                <input Placeholder="X axis title" xtitle={xtitle} onChange={e => setxTitle(e.target.value)} />
            </div>
            <div>
                <input Placeholder="Y axis title" ytitle={ytitle} onChange={e => setyTitle(e.target.value)} />
            </div>

        </div>
    )
}
