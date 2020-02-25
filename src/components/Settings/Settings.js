import React from "react";
import CustomNames from "../CustomNames/CustomNames.js";
import Log from "../Log/Log.js";
import "./Settings.css";

function Settings() {
    return (
        <div className="Settings">
            <CustomNames />
            <Log />
        </div>
    );
}

export default Settings;
