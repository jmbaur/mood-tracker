import React from "react";
import { Link } from 'react-router-dom'
import "./About.css"

function About() {
    return (
        <div className="About">
            <div className="about-info">
                <h1>Mental Health</h1>
                <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
            </div>
            <div className="about-more-info">
                <div>
                    <p>
                        The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.
                    </p>
                </div>
                <Link to="/register"><button>Register Today</button></Link>
            </div>
        </div>
    );
}

export default About;