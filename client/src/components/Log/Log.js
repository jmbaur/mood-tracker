import React from "react";
import axios from "axios";
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
      accessor: "ID",
      disableSortBy: true,
      Cell: ({ row }) => (
        <img
          src={x}
          alt="delete"
          className="trash-button"
          onClick={() => {
            deleteMark(row.original.ID, row.index);
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
    // remove that from detail dataset if exists
    /* if (detailData.findIndex(el => el.mark_id === mark_id) !== -1) {
      const newDetailData = detailData.slice();
      newDetailData.splice(index, 1);
      setDetailData(newDetailData);
    } */

    axios({
      url: `/api/marks?id=${id}`,
      method: "delete"
    });
    // remove mark from array
    const newData = data.slice();
    newData.splice(index, 1);
    setData(newData);
  };

  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          ////////////////////// external calls
          if (columnId === "number" && row.number !== value) {
            console.log(row);
            updateMark(row.ID, value, "");
          }
          if (columnId === "comment" && row.comment !== value) {
            updateMark(row.ID, 0, value);
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
    axios({ url: "/api/marks", method: "get" }).then(res => {
      console.log(res.data.results);
      setData(res.data.results.marks);
    });
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
        {/* <div className="grid-container"> */}
        {/*   <Grid detailData={detailData} toggleDetails={toggleDetails} /> */}
        {/* </div> */}
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
    </main>
  );
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(Log);
