import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

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
  }
 

  return (
    <div>Are you sure want to delete? 
      <button onClick={handleDeleteBook}>Yes</button>
      <button onClick={() => navigate("/")}>No</button>
    </div>
    
  )
}

export default DeleteBook