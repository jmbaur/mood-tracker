import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getMarksDetailed } from "../../redux/moodReducer.js";
import EditText from "../EditText/EditText.js";
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
            this.props.getMarksDetailed(this.props.user.user.user_id);
        }
    };

    changeMarks = () => {
        this.state.changes.forEach(change => {
            axios.put(`/api/mark/${change.mark_id}`, { mood: change.mood });
        });
        this.props.getMarksDetailed(this.props.user.user.user_id);
        this.setState({ changes: [] });
    };

    changeHandler = e => {
        const { name, value } = e.target;
        let arr = this.state.changes.slice();
        const index = this.state.changes.findIndex(
            change => change.mark_id === name
        );
        if (index !== -1) {
            arr.splice(index, 1);
        }
        console.log(arr);
        const newChange = { mark_id: name, mood: value };
        this.setState({
            changes: [...arr, newChange]
        });
    };

    submitComment = async (comment_id, comment) => {
        const res = await axios.post(`/api/comment`, { comment_id, comment });
        if (res.data === "OK") {
        }
    };

    componentDidUpdate(prevProps) {
        if (prevProps.user.user.user_id !== this.props.user.user.user_id) {
            // console.log("user change");
            this.props.getMarksDetailed(this.props.user.user.user_id);
        }
    }

    componentDidMount() {
        if (this.props.user.user.user_id) {
            this.props.getMarksDetailed(this.props.user.user.user_id);
        }
    }

    render() {
        const { loading, marksDetail } = this.props.mood;

        const mappedMarks = marksDetail.map((mark, i) => {
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
                        <EditText
                            text={mark.comment}
                            id={mark.comment_id}
                            submitButtonText="Comment"
                            submit={this.submit}
                        />
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
                                    <th>Comment</th>
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
    getMarksDetailed
};

export default connect(mapStateToProps, mapDispatchToProps)(Log);
