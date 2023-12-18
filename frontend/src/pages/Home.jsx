import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";

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
      <h2>List of Books</h2>
      <Link to={`/books/create`}>Add a new book</Link>
      <table>
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
                <Link to={`/books/details/${book._id}`}>Details</Link>
                <Link to={`/books/edit/${book._id}`}>Edit</Link>
                <Link to={`/books/delete/${book._id}`}>Delete</Link>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;