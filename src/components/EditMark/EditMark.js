import React from "react";

class EditMark extends React.Component {
    constructor() {
        super();
        this.state = {
            mood: 0,
            comment: ""
        };
    }

    submit = e => {
        e.preventDefault();
    };

    componentDidMount() {
        this.setState({
            mood: this.props.mark.mood,
            comment: this.props.mark.comment || ""
        });
    }

    changeHandler = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        console.log(this.state);
        return (
            <form onSubmit={this.submit}>
                <label>
                    Mood
                    <input
                        type="number"
                        min="1"
                        max="5"
                        name="mood"
                        value={this.state.mood}
                        onChange={this.changeHandler}
                    />
                </label>
                <label>
                    Comment
                    <input
                        type="text"
                        name="comment"
                        value={this.state.comment}
                        onChange={this.changeHandler}
                    />
                </label>
                <input type="submit" value="Save" />
                <button onClick={this.props.noEdit}>Cancel</button>
            </form>
        );
    }
}

export default EditMark;
