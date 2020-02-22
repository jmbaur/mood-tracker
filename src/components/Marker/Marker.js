import React from "react";
import "./Marker.css";

function Marker() {
    return (
        <div className="Marker">
            <div className="circle-marker">
                <button className="one">
                    <h1>1</h1>
                </button>
            </div>
            <div className="circle-marker">
                <button className="two">
                    <h1>2</h1>
                </button>
            </div>
            <div className="circle-marker">
                <button className="three">
                    <h1>3</h1>
                </button>
            </div>
            <div className="circle-marker">
                <button className="four">
                    <h1>4</h1>
                </button>
            </div>
            <div className="circle-marker">
                <button className="five">
                    <h1>5</h1>
                </button>
            </div>
        </div>
    );
}

export default Marker;
