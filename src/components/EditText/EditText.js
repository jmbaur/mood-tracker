import React from "react";
import pencil from "./pencil.svg";

// expects props of `submitButtonText` (string), `name` (string), `id` (integer), and `submit` (method)
class EditText extends React.Component {
    constructor() {
        super();
        this.state = { input: "", editText: false };
    }

    changeHandler = e => this.setState({ [e.target.name]: e.target.value });

    editText = () => this.setState({ editText: !this.state.editText });

    internalSubmit = e => {
        e.preventDefault();
        this.props.submit(this.props.id, this.state.input, this.props.id2);
        this.setState({ editText: false });
    };

    componentDidMount() {
        this.setState({ input: this.props.text });
    }

    render() {
        return (
            <div>
                {!this.state.editText ? (
                    <div>
                        <h2>{this.props.text}</h2>
                        <img
                            src={pencil}
                            alt="pencil-button"
                            onClick={this.editText}
                        />
                    </div>
                ) : (
                    <form onSubmit={this.internalSubmit}>
                        <input
                            type="text"
                            name="input"
                            value={this.state.input}
                            placeholder={"default"}
                            onChange={this.changeHandler}
                        />
                        <input
                            type="submit"
                            value={this.props.submitButtonText}
                        />
                        <img
                            src={pencil}
                            alt="pencil-button"
                            onClick={this.editText}
                        />
                    </form>
                )}
            </div>
        );
    }
}

export default EditText;
