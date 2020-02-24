import React from "react";
import { connect } from "react-redux";
import { setTitle, addMark, getMarks } from "../../redux/moodReducer.js";
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

    // getDate = () => {
    //     const event = new Date(Date.now());
    //     return event
    //         .toISOString()
    //         .replace(/T/, " ")
    //         .replace(/\..*/, "");
    // };

    setMood = num => {
        const { defaultMoods } = this.state;
        this.setState({ showMood: true, message: defaultMoods[num].name });
        setTimeout(() => this.setState({ showMood: false }), 1000);
        let numName;
        switch (num) {
            case 0:
                numName = "one";
                break;
            case 1:
                numName = "two";
                break;
            case 2:
                numName = "three";
                break;
            case 3:
                numName = "four";
                break;
            case 4:
                numName = "five";
                break;
            default:
                numName = "default";
        }
        this.props.setTitle(numName);
        const event = new Date(Date.now()).toISOString();
        this.props.addMark({
            user_id: this.props.user.user.user_id,
            time: event,
            mood: num + 1
        });
    };

    componentDidMount() {
        this.props.getMarks({ user_id: this.props.user.user.user_id });
    }

    render() {
        // console.log("Marker Props ", this.props.mood);
        // const { moods } = this.props.mood;
        const { showMood, message } = this.state;
        const custom = null;
        return (
            <div className="Marker">
                <div className="mood-message-container">
                    {showMood ? (
                        <p className="mood-message">{message}</p>
                    ) : null}
                </div>
                <div className="circle-container">
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
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.userReducer,
        mood: state.moodReducer
    };
};

const mapDispatchToProps = {
    setTitle,
    addMark,
    getMarks
};

export default connect(mapStateToProps, mapDispatchToProps)(Marker);
