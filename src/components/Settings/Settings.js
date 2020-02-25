import React from "react";
import "./Settings.css";

class Settings extends React.Component {
    render() {
        return (
            <div className="Settings">
                <form>
                    <label>
                        Use Custom Mood Names
                        <input type="checkbox" />
                    </label>
                    <label>
                        Bad Mood Name
                        <input type="text" />
                    </label>
                    <label>
                        Mediocre Mood Name
                        <input />
                    </label>
                    <label>
                        Ehh Mood Name
                        <input />
                    </label>
                    <label>
                        Good Mood Name
                        <input />
                    </label>
                    <label>
                        Great Mood Name
                        <input />
                    </label>
                </form>
            </div>
        );
    }
}

export default Settings;
