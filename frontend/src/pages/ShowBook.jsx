import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

const ShowBook = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  console.log("Id : " , id);

  useEffect(() => {
    axios
    .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        // console.log("Calling in Details/Show book" ,response.data);
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
      <h1>Showing details of the book</h1>
      <div><strong>Book Id: </strong>{data._id}</div>
      <div><strong>Title:</strong> {data.title}</div>
      <div><strong>Author:</strong> {data.author}</div>
      <div><strong>Publish Year:</strong> {data.publishYear}</div>
      <div><strong>Created At:</strong> {data.createdAt}</div>
      <div><strong>Last Updated:</strong> {data.updatedAt}</div>
    </div>
  )
}

export default ShowBook;