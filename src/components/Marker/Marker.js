import React from "react";
import { connect } from "react-redux";
import "./Marker.css";

class Marker extends React.Component {
    constructor() {
        super();
        this.state = {
            defaultMoods: [
                { num: 1, name: "Feels bad man" },
                { num: 2, name: "Seen better days" },
                { num: 3, name: "Ehhhh" },
                { num: 4, name: "Pretty good" },
                { num: 5, name: "Great!" }
            ],
            showMood: false,
            message: ""
        };
    }

    setMood = num => {
        const { defaultMoods } = this.state;
        this.setState({ showMood: true, message: defaultMoods[num].name });
        setTimeout(() => this.setState({ showMood: false }), 5000);
    };

    render() {
        // console.log("Marker Props ", this.props);
        // const { moods } = this.props.mood;
        const { defaultMoods, showMood, message } = this.state;
        const custom = null;
        return (
            <div className="Marker">
                <div className="mood-message">
                    {showMood ? <p>{message}</p> : <p>Set your mood</p>}
                </div>
                <div className="circle-marker">
                    <button
                        className="one"
                        onClick={() => this.setMood(custom || 0)}
                    ></button>
                </div>
                <div className="circle-marker">
                    <button
                        className="two"
                        onClick={() => this.setMood(custom || 1)}
                    ></button>
                </div>
                <div className="circle-marker">
                    <button
                        className="three"
                        onClick={() => this.setMood(custom || 2)}
                    ></button>
                </div>
                <div className="circle-marker">
                    <button
                        className="four"
                        onClick={() => this.setMood(custom || 3)}
                    ></button>
                </div>
                <div className="circle-marker">
                    <button
                        className="five"
                        onClick={() => this.setMood(custom || 4)}
                    ></button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        mood: state.moodReducer
    };
};

export default connect(mapStateToProps)(Marker);
