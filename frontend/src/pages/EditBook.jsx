import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditBook = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");

  // console.log("Id : " , id);

  useEffect(() => {
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
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

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };

    setLoading(true);

    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then((response) => {
        console.log('Data updated successfully:', response.data);
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setError(error); // Set error state if the request fails
        setLoading(false);
      });
  };
  return (
    <div>
      <h1>Edit details of book</h1>
      <div>
        <strong>Title:</strong>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <strong>Author:</strong>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        <strong>Publish Year:</strong>
        <input
          type="text"
          value={publishYear}
          onChange={(e) => setPublishYear(e.target.value)}
        />
      </div>
      <button onClick={handleEditBook}>Save</button>
    </div>
  );
};

export default EditBook;
