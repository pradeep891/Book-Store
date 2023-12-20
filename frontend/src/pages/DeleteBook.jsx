import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../css/DeleteConfirmation.css";

const DeleteBook = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDeleteBook = () => {
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
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
    <div className="confirmation-dialog">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Delete Book</h5>
          <p className="card-text">
            Are you sure you want to delete this book?
          </p>
          <button onClick={handleDeleteBook} className="btn btn-danger m-2">
            Confirm
          </button>
          <button
            onClick={() => navigate("/")}
            className="btn btn-secondary m-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
