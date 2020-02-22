import React from "react";
import { connect } from "react-redux";
import NoUser from "../NoUser/NoUser.js";
import Marker from "../Marker/Marker.js";
import Chart from "../Chart/Chart.js";
import "./Main.css";

class Main extends React.Component {
    render() {
        const { loggedIn } = this.props;
        return (
            <main className="Main">
                {!loggedIn ? (
                    <NoUser />
                ) : (
                    <div>
                        <Marker />
                        <Chart />
                    </div>
                )}
            </main>
        );
    }
}

const mapStateToProps = state => state;

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
