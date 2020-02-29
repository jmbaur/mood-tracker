import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import styled from "styled-components";
import {
    useTable,
    useGroupBy,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
} from "react-table";
import Table from "../Table/Table.js";
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
        }
    }
    .pagination {
        padding: 0.5rem;
    }
`;

function Log(props) {
    const columns = [
        { Header: "Timestamp", accessor: "time" },
        { Header: "Mood", accessor: "mood" },
        { Header: "Comment", accessor: "comment" },
        {
            Header: "",
            accessor: "comment_id",
            Cell: ({ row }) => (
                <button onClick={e => console.log(row.values)}>Click Me</button>
            )
        },
        {
            Header: "",
            accessor: "mark_id",
            Cell: ({ row }) => (
                <div>
                    <button onClick={e => console.log(row.values)}>
                        Delete
                    </button>
                </div>
            )
        }
    ];
    const [data, setData] = useState([]);
    console.log(data);
    useEffect(() => {
        async function getData() {
            const res = await axios.get(
                `/api/marks_detail?user_id=${props.user.user_id}`
            );
            setData(res.data);
        }
        getData();
    }, props.user.user_id);
    // console.log(data);

    return (
        <Styles>
            <Table columns={columns} data={data} />
        </Styles>
    );
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(Log);
