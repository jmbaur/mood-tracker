import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import "./Comment.css"

class Comment extends React.Component {
    constructor() {
        super();
        this.state = { input: "" };
    }

    outsideClick = e => {
        if (e.target.className === "Comment") this.props.falseShowMood()
    }

    changeHandler = e => this.setState({ [e.target.name]: e.target.value });

    submitComment = async e => {
        e.preventDefault();
        const { mark_id } = this.props.recentMark;
        const { user_id } = this.props.user;
        const res = await axios.post(`/api/comments`, {
            mark_id,
            comment: this.state.input,
            user_id
        });
        if (res.data === "OK") {
            this.props.falseShowMood();
        }
    };

    render() {
        const { message } = this.props;

        return (
            <div className="Comment" onClick={this.outsideClick}>
                <form onSubmit={this.submitComment}>
                    <h1>{message}</h1>
                    <label>
                        Make a comment!
                        <input
                            type="text"
                            name="input"
                            value={this.state.input}
                            placeholder="optional"
                            onChange={this.changeHandler}
                        />
                    </label>
                    <div className="buttons-container">
                        <button type="submit">Comment</button>
                        <button type="button" onClick={this.props.falseShowMood}>
                            No thanks
                    </button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => state
    ;
export default connect(mapStateToProps)(Comment);
