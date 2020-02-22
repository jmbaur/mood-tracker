import React from "react";
import { connect } from "react-redux";
import { animateScroll as scroll } from "react-scroll";
import NoUser from "../NoUser/NoUser.js";
import Marker from "../Marker/Marker.js";
import Chart from "../Chart/Chart.js";
import arrow from "./arrow.svg";
import "./Main.css";

class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            arrow: "down",
            topOfPage: true
        };
    }

    rotate = () => {
        if (this.state.arrow === "down") {
            this.setState({ arrow: "up" });
        } else {
            this.setState({ arrow: "down" });
        }
    };

    scroll = () => {
        this.rotate();
        this.state.topOfPage ? scroll.scrollToBottom() : scroll.scrollToTop();
        this.setState({ topOfPage: !this.state.topOfPage });
    };

    render() {
        const { loggedIn } = this.props;
        return (
            <main className="Main">
                {!loggedIn ? (
                    <NoUser />
                ) : (
                    <div>
                        <Marker />
                        <div className="arrow" onClick={this.scroll}>
                            <img
                                src={arrow}
                                alt="arrow"
                                id={this.state.arrow}
                            />
                        </div>
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