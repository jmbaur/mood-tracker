import React from "react";
import CustomNames from "../CustomNames/CustomNames.js";
import Log from "../Log/Log.js";
import pencil from "./pencil.svg";
import list from "./list.svg";
import "./Settings.css";

class Settings extends React.Component {
    constructor() {
        super();
        this.state = { firstPage: true };
    }

    toggle = status => {
        this.setState({ firstPage: status });
    };

    render() {
        return (
            <div className="Settings">
                <div>
                    <img
                        src={list}
                        alt="log-icon"
                        onClick={() => this.toggle(true)}
                    />
                    <img
                        src={pencil}
                        alt="names-icon"
                        onClick={() => this.toggle(false)}
                    />
                </div>
                {this.state.firstPage ? <Log /> : <CustomNames />}
            </div>
        );
    }
}

export default Settings;
