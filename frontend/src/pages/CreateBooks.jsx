import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";

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
    <>
      <Navbar />
      <Link to="/" class="btn btn-primary ">
        Go Back
      </Link>

      <div className="container mw-50 mt-5" style={{ maxWidth: "700px" }}>
        <div>
          <h1 className="text-center">Enter Details</h1>

          <div className="mb-3">
            <label class="form-label">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              class="form-control"
            />
          </div>
          <div className="mb-3">
            <label class="form-label">Author</label>
            <input
              class="form-control"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label class="form-label">Publish Year</label>
            <input
              class="form-control"
              type="text"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
            />
          </div>

          <button onClick={handleCreateBook} class="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateBooks;
