import React from "react";
import "./CustomNames.css";

class CustomNames extends React.Component {
    constructor() {
        super();
        this.state = {
            custom: null,
            one: "",
            two: "",
            three: "",
            four: "",
            five: ""
        };
    }

    changeHandler = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        const { one, two, three, four, five } = this.state;

        return (
            <div className="CustomNames">
                <form>
                    <label>
                        Use Custom Mood Names
                        <input type="checkbox" />
                    </label>
                    <label>
                        Bad Mood Name
                        <input
                            type="text"
                            name="one"
                            value={one}
                            placeholder=""
                            onChange={this.changeHandler}
                        />
                    </label>
                    <label>
                        Mediocre Mood Name
                        <input
                            type="text"
                            name="two"
                            value={two}
                            placeholder=""
                            onChange={this.changeHandler}
                        />
                    </label>
                    <label>
                        Ehh Mood Name
                        <input
                            type="text"
                            name="three"
                            value={three}
                            placeholder=""
                            onChange={this.changeHandler}
                        />
                    </label>
                    <label>
                        Good Mood Name
                        <input
                            type="text"
                            name="four"
                            value={four}
                            placeholder=""
                            onChange={this.changeHandler}
                        />
                    </label>
                    <label>
                        Great Mood Name
                        <input
                            type="text"
                            name="five"
                            value={five}
                            placeholder=""
                            onChange={this.changeHandler}
                        />
                    </label>
                </form>
            </div>
        );
    }
}

export default CustomNames;
