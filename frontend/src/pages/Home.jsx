import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      axios.get('http://localhost:5555/books')
        .then(response => {
            console.log(response.data);
          setData(response.data);
          setLoading(false); // Set loading to false when data is received successfully
        })
        .catch(error => {
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
      <h2>List of Books</h2>
      <ul>
        {data.map(book => (
          <li key={book._id}>
            <strong>Title:</strong> {book.title}, 
            <strong>Author:</strong> {book.author}, 
            <strong>PublishYear:</strong> {book.publishYear}, 
            <strong>created at:</strong> {book.createdAt}
            <strong>updated at:</strong> {book.updatedAt}
            <strong>Id:</strong> {book._id}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home