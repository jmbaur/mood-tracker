import React from 'react';
import { Link } from 'react-router-dom'
import "./Protected.css"

function Protected() {
    return (
        <div className="Protected">
            <div className="title">
                <h1>Not logged in</h1>
            </div>
            <div className="content-container">
                <p>Please log in or register to start using!</p>
                <div className="protected-button-container">
                    <Link to="/login"><button>Login</button></Link>
                    <Link to="/register"><button>Register</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Protected;
