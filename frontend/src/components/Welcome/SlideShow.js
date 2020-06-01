import React, { fragment, Fragment } from 'react';
import { Slide } from 'react-slideshow-image';
import "./Slideshow.css"
import chart1 from '../../assets/images/slideshow/chart1.jpeg'
import chart2 from '../../assets/images/slideshow/chart2.png'
import chart3 from '../../assets/images/slideshow/chart3.png'


// const slideImages = [
//     chart1,
//     chart2,
//     chart3
// ];

const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true,
    pauseOnHover: true,
    // onChange: (oldIndex, newIndex) => {
    //     console.log(`slide transition from ${oldIndex} to ${newIndex}`);
    // }
}

const Slideshow = () => {
    return (
        <Fragment>

            <div className="slide-container">
                <div className="tagline">Visualise your most important business data in just a few clicks</div>
                <Slide {...properties}>

                    <div className="each-slide">
                        <div style={{ 'backgroundImage': `url(${chart1})` }}>
                            <span className="words">Make Beautiful Charts</span>
                        </div>

                    </div>
                    <div className="each-slide">
                        <div style={{ 'backgroundImage': `url(${chart2})` }}>
                            <span>Organize Your Data</span>
                        </div>
                    </div>
                    <div className="each-slide">
                        <div style={{ 'backgroundImage': `url(${chart3})` }}>
                            <span>Simple, Fast & Free</span>
                        </div>
                    </div>

                </Slide>

                <div className="text-center mt-3">
                    <a href="/register" className="join">Join Now For Free</a>
                </div>

            </div>
        </Fragment>
    )
}

export default Slideshow