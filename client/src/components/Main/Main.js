import React from "react";
import { connect } from "react-redux";
import About from "../About/About.js";
import Marker from "../Marker/Marker.js";
import Loading from "../Loading/Loading.js";
import "./Main.css";

function Main(props) {
    const { loggedIn, loading } = props;
    return (
        <main className="Main">
            {loading ? (
                <Loading />
            ) : loggedIn ? (
                <div className="Main">
                    <Marker />
                </div>
            ) : (
                <About />
            )}
        </main>
    );
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Main);
