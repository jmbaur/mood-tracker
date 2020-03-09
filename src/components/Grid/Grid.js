import React from "react";
import "./Grid.css";

function Grid(props) {
    const colors = [
        "rgb(227,49,51)",
        "rgb(240,116,58)",
        "rgb(255,190,58)",
        "rgb(151,187,61)",
        "rgb(67,184,63)"
    ];
    const grid = props.data.map(el => {
        return (
            <div key={el.date} className="grid-element">
                {el.mood ? (
                    <div
                        className="color-block"
                        onClick={() => props.viewDetails(el.date)}
                        style={{
                            backgroundColor:
                                colors[Math.floor(el.mood / el.count)]
                        }}
                    >
                        <span className="tooltip">
                            <em>{el.count} marks</em> {el.fullDate}
                        </span>
                    </div>
                ) : (
                    <div className="color-block">
                        <span className="tooltip">
                            <em>0 marks </em>
                            {el.fullDate}
                        </span>
                    </div>
                )}
            </div>
        );
    });
    return <div className="Grid">{grid}</div>;
}

export default Grid;
