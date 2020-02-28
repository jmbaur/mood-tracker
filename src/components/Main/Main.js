import React from "react";
import { connect } from "react-redux";
import NoUser from "../NoUser/NoUser.js";
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
                <NoUser />
            )}
        </main>
    );
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Main);
