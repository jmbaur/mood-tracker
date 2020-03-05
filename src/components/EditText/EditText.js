import React from "react";

class EditText extends React.Component {
    constructor() {
        super();
        this.state = {
            input: ""
        };
    }

    changeHandler = e => this.setState({ [e.target.name]: e.target.value });

    internalSubmit = e => {
        e.preventDefault();
        this.props.submit(this.props.num, this.state.input);
    };

    internalDelete = () => {
        this.props.delete(this.props.num);
    };

    componentDidMount() {
        this.setState({ input: this.props.input });
    }

    render() {
        return (
            <form onSubmit={this.internalSubmit}>
                <div
                    className="color-container"
                    style={{ backgroundColor: this.props.color }}
                ></div>
                <input
                    type="text"
                    value={this.state.input}
                    onChange={this.changeHandler}
                />
                <button type="submit">Submit</button>
                <button onClick={this.internalDelete}>Delete</button>
            </form>
        );
    }
}

export default EditText;
