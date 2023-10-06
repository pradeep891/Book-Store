import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CreateBooks = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");

  const handleCreateBook = () => {
    const data = {
      title: title,
      author: author,
      publishYear: publishYear,
    };

    axios
      .post(`http://localhost:5555/books`, data)
      .then((response) => {
        setLoading(false); // Set loading to false when data is received successfully
        navigate("/");
      })
      .catch((error) => {
        setError(error); // Set error state if the request fails
        setLoading(false); // Set loading to false even if there is an error
      });

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error occurred: {error.message}</div>;
    }
  };

  return (
    <div>
      <h1>Add a new book</h1>
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
      <button onClick={handleCreateBook}>Save</button>
    </div>
  );
};

export default CreateBooks;
