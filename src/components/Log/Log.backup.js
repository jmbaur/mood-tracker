import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import styled from "styled-components";
import Table from "../Table/Table.js";
import EditMark from "../EditMark/EditMark.js";
import "./Log.css";

class Log extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            edit: false,
            editMark: {}
        };
    }
    noEdit = () => this.setState({ edit: false });

    getData = async () => {
        const res = await axios.get(
            `/api/marks_detail?user_id=${this.props.user.user_id}`
        );
        this.setState({ data: res.data });
    };

    deleteMark = async id => {
        const res = await axios.delete(`/api/marks/${id}`);
        if (res.data === "OK") {
            this.getData();
        }
    };

    componentDidMount() {
        this.getData();
    }
    render() {
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
        const columns = [
            {
                Header: "",
                accessor: "mark_id",
                disableSortBy: true,
                Cell: ({ row }) => (
                    <div>
                        <button
                            onClick={e => {
                                console.log(row.original);
                                this.setState({
                                    edit: !this.state.edit,
                                    editMark: row.original
                                });
                            }}
                        >
                            Edit
                        </button>
                        <button
                            onClick={e => this.deleteMark(row.original.mark_id)}
                        >
                            Delete
                        </button>
                    </div>
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

        return (
            <div>
                {!this.state.edit ? null : (
                    <EditMark mark={this.state.editMark} noEdit={this.noEdit} />
                )}
                <Styles>
                    <Table columns={columns} data={this.state.data} />
                </Styles>
            </div>
        );
    }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(Log);
