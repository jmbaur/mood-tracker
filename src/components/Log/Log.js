import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import styled from "styled-components";
import Table from "../Table/Table.js";
import Protected from "../Protected/Protected.js";
import Grid from "../Grid/Grid.js";
import x from "./x.svg";
import "./Log.css";

const Styles = styled.div`
    padding: 1rem;

    table {
        border-spacing: 0;
        border: 1px solid black;

        tr {
            :last-child {
                td {
                    border-bottom: 0;
                }
            }
        }

        th,
        td {
            margin: 0;
            padding: 0.5rem;
            border-bottom: 1px solid black;
            border-right: 1px solid black;

            :last-child {
                border-right: 0;
            }

            input {
                font-size: 1rem;
                padding: 0;
                margin: 0;
                border: 0;
            }
        }
    }

    .pagination {
        padding: 0.5rem;
    }
`;

function Log(props) {
    const columns = [
        {
            Header: "",
            accessor: "mark_id",
            disableSortBy: true,
            Cell: ({ row }) => (
                <img
                    src={x}
                    alt="delete"
                    className="trash-button"
                    onClick={() => {
                        deleteMark(
                            row.original.comment_id,
                            row.original.mark_id,
                            row.index
                        );
                    }}
                />
            )
        },
        {
            Header: "Timestamp",
            accessor: "time",
            Cell: ({ cell: { value } }) => new Date(value).toLocaleString()
        },
        { Header: "Mood", accessor: "mood" },
        {
            Header: "Comment",
            accessor: "comment",
            disableSortBy: true
        }
    ];

    const updateComment = (comment_id, mark_id, comment) => {
        console.log("old comment", mark_id, comment);
        axios.put(`/api/comments/${comment_id}`, {
            mark_id,
            comment,
            user_id: props.user.user_id
        });
    };

    const postComment = (mark_id, comment) => {
        console.log("new comment", mark_id, comment);
        axios.post(`/api/comments`, {
            mark_id,
            comment,
            user_id: props.user.user_id
        });
    };

    const updateMark = (id, mood) => {
        axios.put(`/api/marks/${id}`, { mood });
    };

    const deleteMark = async (comment_id, mark_id, index) => {

        // remove that from detail dataset if exists
        if (detailData.findIndex(el => el.mark_id === mark_id) !== -1) {
            const newDetailData = detailData.slice();
            newDetailData.splice(index, 1);
            setDetailData(newDetailData);
        }

        const res = await axios.delete(
            `/api/marks?comment_id=${comment_id || 0}&mark_id=${mark_id}`
        );
        if (res.data === "OK") {
            axios
                .get(`/api/marks?user_id=${props.user.user_id}&type=log`)
                .then(res => setData(res.data));
        }
    };

    const updateMyData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true);
        setData(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    ////////////////////// external calls
                    switch (columnId) {
                        case "comment":
                            row.comment_id
                                ? updateComment(
                                      row.comment_id,
                                      row.mark_id,
                                      value
                                  )
                                : postComment(row.mark_id, value);
                            break;
                        case "mood":
                            updateMark(row.mark_id, value);
                            break;
                        default:
                            console.log("updateMyData err");
                    }
                    //////////////////////
                    return {
                        ...old[rowIndex],
                        [columnId]: value
                    };
                }
                return row;
            })
        );
    };

    const toggleDetails = async (doy, year) => {
        const res = await axios.get(
            `/api/marks?user_id=${props.user.user_id}&type=grid&filter=detail&doy=${doy}&year=${year}`
        );
        if (recent !== doy) {
            setShowDetails(true);
            setRecent(doy);
            setDetailData(res.data);
        } else {
            setShowDetails(false);
            setRecent(0);
        }
    };

    const [data, setData] = React.useState([]);
    const [skipPageReset, setSkipPageReset] = React.useState(false);
    const [recent, setRecent] = React.useState(0);
    const [showDetails, setShowDetails] = React.useState(false);
    const [detailData, setDetailData] = React.useState([]);

    React.useEffect(() => {
        if (props.user.user_id) {
            axios
                .get(`/api/marks?user_id=${props.user.user_id}&type=log`)
                .then(res => setData(res.data));
        }
    }, [props.user.user_id]);

    React.useEffect(() => {
        setSkipPageReset(false);
    }, [data]);

    return (
        <main className="Log">
            {props.loggedIn ? (
                <div>
                    <div className="title">
                        <h1>View or change your past moods</h1>
                    </div>
                    <div className="grid-container">
                        <Grid
                            detailData={detailData}
                            toggleDetails={toggleDetails}
                        />
                    </div>
                    <div className="table-container">
                        <Styles>
                            <Table
                                columns={columns}
                                data={!showDetails ? data : detailData}
                                updateMyData={updateMyData}
                                skipPageReset={skipPageReset}
                            />
                        </Styles>
                    </div>
                </div>
            ) : (
                <Protected />
            )}
        </main>
    );
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(Log);
