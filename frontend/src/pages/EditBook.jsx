import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";

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
    <>
      <Navbar />
      <Link to="/" class="btn btn-primary ">
        Go Back
      </Link>

      <div className="container mw-50 mt-5" style={{ maxWidth: "700px" }}>
        <div>
          <h1 className="text-center">Edit details</h1>

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

          <button onClick={handleEditBook} class="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default EditBook;
