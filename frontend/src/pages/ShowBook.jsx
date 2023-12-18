import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../css/ShowBook.css";
import Navbar from "../components/navbar";

const ShowBook = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  console.log("Id : ", id);

  useEffect(() => {
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        // console.log("Calling in Details/Show book" ,response.data);
        setData(response.data);
        console.log("Data : ", data);
        setLoading(false); // Set loading to false when data is received successfully
      })
      .catch((error) => {
        setError(error); // Set error state if the request fails
        setLoading(false); // Set loading to false even if there is an error
      });
  }, []); // The empty dependency array means this effect runs once after the initial render

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred: {error.message}</div>;
  }

  return (
    <>
      <Navbar></Navbar>
      <Link to="/" class="btn btn-primary ">
        Go Back
      </Link>

      <div style={{ paddingTop: "50px" }}>
        <h1
          style={{
            textAlign: "center",
            fontWeight: "bolder",
            marginBottom: "40px",
          }}
        >
          Book Details
        </h1>

        <div
          className="container d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "#f1f3f4" }}
        >
          <div className="border border-primary p-5 text-white bg-dark">
            <table class="table table-dark">
              <tr>
                <td>
                  <strong>Book Id: </strong>
                </td>
                <td>{data._id}</td>
              </tr>

              <tr>
                <td>
                  <strong>Title: </strong>
                </td>
                <td>{data.title}</td>
              </tr>
              <tr>
                <td>
                  <strong>Author: </strong>
                </td>
                <td>{data.author}</td>
              </tr>
              <tr>
                <td>
                  <strong>Publish Year: </strong>
                </td>
                <td>{data.publishYear}</td>
              </tr>
              <tr>
                <td>
                  <strong>Created At: </strong>
                </td>
                <td>{data.createdAt}</td>
              </tr>
              <tr>
                <td>
                  <strong>Last Updated: </strong>
                </td>
                <td>{data.updatedAt}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowBook;
