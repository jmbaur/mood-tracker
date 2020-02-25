import React from "react";
import { connect } from "react-redux";
import "./CustomNames.css";

class CustomNames extends React.Component {
    constructor() {
        super();
        this.state = {
            custom: false,
            one: "",
            two: "",
            three: "",
            four: "",
            five: ""
        };
    }

    changeHandler = e => this.setState({ [e.target.name]: e.target.value });

    checkboxChange = e => this.setState({ custom: !this.state.custom });

    componentDidMount() {
        this.setState({ custom: this.props.user.user.custom_mood });
    }

    render() {
        const { custom, one, two, three, four, five } = this.state;

        return (
            <div className="CustomNames">
                <form>
                    <label>
                        Use Custom Mood Names
                        <input
                            type="checkbox"
                            checked={custom}
                            onChange={this.checkboxChange}
                        />
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
                    <input type="submit" value="Save Changes" />
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.userReducer
    };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CustomNames);
