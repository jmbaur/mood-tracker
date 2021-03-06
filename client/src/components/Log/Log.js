import React from "react";
import axios from "axios";
import moment from "moment";
import { connect } from "react-redux";
import styled from "styled-components";
import Table from "../Table/Table.js";
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
      accessor: "_id",
      disableSortBy: true,
      Cell: ({ row }) => (
        <img
          src={x}
          alt="delete"
          className="trash-button"
          onClick={() => {
            deleteMark(row.original._id, row.index);
          }}
        />
      )
    },
    {
      Header: "Timestamp",
      accessor: "time",
      Cell: ({ cell: { value } }) => new Date(value).toLocaleString()
    },
    { Header: "Mood", accessor: "number" },
    {
      Header: "Comment",
      accessor: "comment",
      disableSortBy: true
    }
  ];

  const updateMark = (id, number, comment) => {
    axios({
      method: "put",
      url: `/api/marks?id=${id}`,
      data: { number, comment }
    });
  };

  const deleteMark = (id, index) => {
    axios({
      url: `/api/marks?id=${id}`,
      method: "delete"
    });
    // remove mark from array
    let newData = data.slice();
    if (showDetailData) {
      let newDetailData = detailData.slice();
      newDetailData.splice(index, 1);
      setDetailData(newDetailData);
      let altIndex = newData.findIndex(el => el._id === id);
      if (altIndex !== -1) newData.splice(altIndex, 1);
      setData(newData);
    } else {
      newData.splice(index, 1);
      setData(newData);
    }
  };

  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          ////////////////////// external calls
          if (columnId === "number" && row.number !== value) {
            updateMark(row._id, +value, "");
          }
          if (columnId === "comment" && row.comment !== value) {
            updateMark(row._id, 0, value);
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

  const [data, setData] = React.useState([]);
  const [detailData, setDetailData] = React.useState([]);
  const [skipPageReset, setSkipPageReset] = React.useState(false);
  const [showDetailData, setShowDetailData] = React.useState(false);
  const [recentDoy, setRecentDoy] = React.useState(0);

  const getData = async (start, end, detailed) => {
    const url = `/api/marks?start=${start}&end=${end}`;
    const { data } = await axios({ method: "get", url });
    if (detailed) {
      setDetailData(data.marks || []);
    } else {
      setData(data.marks || []);
    }
  };

  const toggleDetails = (start, end, doy) => {
    if (recentDoy !== doy) {
      setRecentDoy(doy);
      getData(start, end, true);
      setShowDetailData(true);
    } else {
      setShowDetailData(!showDetailData);
    }
  };

  React.useEffect(() => {
    const daysToGet = 83 + parseInt(moment().format("e"));
    const start = moment()
      .subtract(daysToGet, "days")
      .startOf("day")
      .format();
    const end = moment()
      .endOf("day")
      .format();
    getData(start, end, false);
  }, []);

  React.useEffect(() => {
    setSkipPageReset(false);
  }, [data]);

  return (
    <main className="Log">
      <div>
        <div className="title">
          <h1>View or change your past moods</h1>
        </div>
        <div className="grid-container">
          <Grid
            toggleDetails={toggleDetails}
            data={data}
            detailData={detailData}
          />
        </div>
        <div className="table-container">
          <Styles>
            <Table
              columns={columns}
              data={!showDetailData ? data : detailData}
              updateMyData={updateMyData}
              skipPageReset={skipPageReset}
            />
          </Styles>
        </div>
      </div>
    </main>
  );
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(Log);
