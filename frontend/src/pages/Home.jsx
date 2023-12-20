import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import "../css/Home.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        // console.log(response.data);
        setData(response.data);
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
    <div>
      <Navbar />
      <div className="p-2" style={{ backgroundColor: "#EDE9D5" }}>
        <span>Want to add some more book? </span>
        <Link to={`/books/create`} className="btn btn-primary">
          Add now
        </Link>
      </div>
      <h2 style={{ color: "#0766AD", textAlign: "center", margin: "30px" }}>
        List of all Books
      </h2>
      <div
        className="container p-4"
        style={{
          maxWidth: "1000px",
          backgroundColor: "#EEF5FF",
          borderRadius: "40px",
        }}
      >
        <table className="table alternate-columns text-center">
          <thead>
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Author</th>
              <th>Publish Year</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {data.map((book, index) => (
              <tr key={book._id}>
                <th>{index + 1}</th>
                <th>{book.title}</th>
                <th> {book.author}</th>
                <th> {book.publishYear}</th>
                <th>
                  <Link to={`/books/details/${book._id}`} className="link-styled"> <InfoIcon/> </Link>
                  <Link to={`/books/edit/${book._id}`} className="link-styled"> <EditIcon/> </Link>
                  <Link to={`/books/delete/${book._id}`} className="link-styled"> <DeleteIcon/> </Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
