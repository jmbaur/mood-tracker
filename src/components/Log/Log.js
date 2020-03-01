import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import styled from "styled-components";
import Table from "../Table/Table.js";
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
                    onClick={() =>
                        deleteMark(
                            row.original.comment_id,
                            row.original.mark_id
                        )
                    }
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
        axios.put(`/api/comments/${comment_id}`, {
            mark_id,
            comment,
            user_id: props.user.user_id
        });
    };

    const postComment = (mark_id, comment) => {
        axios.post(`/api/comments`, {
            mark_id,
            comment,
            user_id: props.user.user_id
        });
    };

    const updateMark = (id, mood) => {
        axios.put(`/api/marks/${id}`, { mood });
    };

    const deleteMark = async (comment_id, mark_id) => {
        const res = await axios.delete(
            `/api/marks?comment_id=${comment_id || 0}&mark_id=${mark_id}`
        );
        if (res.data === "OK") {
            axios
                .get(`/api/marks_detail?user_id=${props.user.user_id}`)
                .then(res => setData(res.data));
        }
    };

    const updateMyData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true);
        setData(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    console.log(columnId, typeof columnId);
                    ////////////////////// axios calls
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
                            console.log(row.mark_id, value);
                            updateMark(row.mark_id, value);
                            break;
                        default:
                            console.log("default hit");
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

    const [data, setData] = useState([]);
    // const [originalData] = useState(data);
    const [skipPageReset, setSkipPageReset] = useState(false);
    // const resetData = () => setData(originalData);

    useEffect(() => {
        axios
            .get(`/api/marks_detail?user_id=${props.user.user_id}`)
            .then(res => setData(res.data));
    }, [props.user.user_id]);

    useEffect(() => {
        setSkipPageReset(false);
    }, [data]);

    return (
        <Styles>
            <Table
                columns={columns}
                data={data}
                updateMyData={updateMyData}
                skipPageReset={skipPageReset}
            />
        </Styles>
    );
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(Log);
