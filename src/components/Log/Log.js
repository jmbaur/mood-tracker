import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getMarks } from "../../redux/moodReducer.js";
import trash from "./trash.svg";
import "./Log.css";

class Log extends React.Component {
    constructor() {
        super();
        this.state = {
            changes: []
        };
    }

    deleteMark = async mark_id => {
        const status = await axios.delete(`/api/mark/${mark_id}`);
        if (status.data === "OK") {
            this.props.getMarks({ user_id: this.props.user.user.user_id });
        }
    };

    changeMarks = () => {
        this.state.changes.forEach(change => {
            axios.put(`/api/mark/${change.mark_id}`, { mood: change.mood });
        });
        this.props.getMarks({ user_id: this.props.user.user.user_id });
        this.setState({ changes: [] });
    };

    changeHandler = e => {
        const { name, value } = e.target;
        const newChange = { mark_id: name, mood: value };
        this.setState({
            changes: [...this.state.changes, newChange]
        });
    };

    componentDidMount() {
        this.props.getMarks({ user_id: this.props.user.user.user_id });
    }

    render() {
        const { loading, marks } = this.props.mood;
        const condensedMarks =
            marks.length > 10
                ? marks.slice(marks.length - 10, marks.length - 1)
                : marks;

        const mappedMarks = condensedMarks
            .slice()
            .sort((a, b) => a.mark_id - b.mark_id)
            .map((mark, i) => {
                let date = new Date(mark.time).toUTCString();
                return (
                    <tr key={mark.mark_id}>
                        <td>{date}</td>
                        <td>
                            <select
                                name={mark.mark_id}
                                defaultValue={mark.mood}
                                onChange={this.changeHandler}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </td>
                        <td>
                            <img
                                src={trash}
                                alt="delete"
                                className="trash-button"
                                onClick={() => this.deleteMark(mark.mark_id)}
                            />
                        </td>
                    </tr>
                );
            });
        return (
            <div className="Log">
                {loading ? (
                    <h1>LOADING</h1>
                ) : (
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Date</th>
                                    <th>Mood</th>
                                </tr>
                                {mappedMarks}
                            </tbody>
                        </table>
                        <button onClick={this.changeMarks}>Save Changes</button>
                    </div>
                )}
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
    getMarks
};

export default connect(mapStateToProps, mapDispatchToProps)(Log);
