import React from "react";
import "./Warning.css";

function Warning(props) {
    return (
        <div className="Warning" onClick={props.fn1}>
            <div className="warning-container">
                <h1>Are you sure?</h1>
                <div className="button-container">
                    <button onClick={props.fn1}>No</button>
                    <button onClick={props.fn2} id="yes">Yes</button>
                </div>
            </div>
        </div>
    );
}

export default Warning;
