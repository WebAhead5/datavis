import React, { fragment, Fragment } from 'react';
import { Slide } from 'react-slideshow-image';
import "./Slideshow.css"

const slideImages = [
    "../assets/images/slideshow/chart1.jpeg",
    "../assets/images/slideshow/chart2.png",
    "../assets/images/slideshow/chart3.png"
];

const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true,
    pauseOnHover: true,
    onChange: (oldIndex, newIndex) => {
        console.log(`slide transition from ${oldIndex} to ${newIndex}`);
    }
}

const Slideshow = () => {
    return (
        <Fragment>

            <div className="slide-container">
                <div className="tagline">Visualise your most important business data in just a few clicks</div>
                <Slide {...properties}>
                    <div className="each-slide">
                        <div style={{ 'backgroundImage': `url(${slideImages[0]})` }}>
                            <span>Slide 1</span>
                        </div>
                    </div>
                    <div className="each-slide">
                        <div style={{ 'backgroundImage': `url(${slideImages[1]})` }}>
                            <span>Slide 2</span>
                        </div>
                    </div>
                    <div className="each-slide">
                        <div style={{ 'backgroundImage': `url(${slideImages[2]})` }}>
                            <span>Slide 3</span>
                        </div>
                    </div>
                </Slide>
            </div>
        </Fragment>
    )
}

export default Slideshow