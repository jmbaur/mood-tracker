import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

function About() {
    return (
        <div className="About">
            <div className="about-info">
                <h1>Mental Health</h1>
                <p>
                    Mental health includes our emotional, psychological, and
                    social well-being. It affects how we think, feel, and act.
                    It also helps determine how we handle stress, relate to
                    others, and make choices. Mental health is important at
                    every stage of life, from childhood and adolescence through
                    adulthood.
                </p>
            </div>
            <div className="about-more-info">
                <p>
                    This web app gives you a way of tracking your moods as you
                    go throughout your day, allowing you to <em>see</em> your
                    progress. Track your moods, make comments, and get
                    data-driven insight into your mental health!
                </p>
                <Link to="/register">
                    <button>Register Today</button>
                </Link>
            </div>
        </div>
    );
}

export default About;
