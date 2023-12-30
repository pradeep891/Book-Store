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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Number of items to display per page
  const [sortType, setSortType] = useState('title');

  useEffect(() => {
    axios
      .get("http://localhost:5555/books")
            .then((response) => {
        // console.log(response.data);
        const sortArray = value => {
          let sortedData = [...response.data]; // Create a copy of the original data
          // console.log("Sorted data " , sortedData)
          if (value === "author") {
            sortedData.sort((a, b) => a.author.localeCompare(b.author));
          } else if (value === "title") {
            sortedData.sort((a, b) => a.title.localeCompare(b.title));
          } else if (value === "publishYear") {
            sortedData.sort((a, b) => a.publishYear - b.publishYear);
          }    
          setData(sortedData);
        };
        sortArray(sortType);
        setLoading(false); // Set loading to false when data is received successfully
      })
      .catch((error) => {
        setError(error); // Set error state if the request fails
        setLoading(false); // Set loading to false even if there is an error
      });
  }, [currentPage, itemsPerPage, sortType]); // The empty dependency array means this effect runs once after the initial render

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to page 1 when changing items per page
  };

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

        <div className="d-inline-block mb-3">
          <span className="me-2">Sort by: </span>
          <select onChange={(e) => {
            setSortType(e.target.value);
            setCurrentPage(1);
          }}  className="form-select-sm" value={sortType}>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="publishYear">Publish Year</option>
          </select>
        </div>

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
            {data.slice(itemsPerPage*(currentPage -1 ) , itemsPerPage*currentPage).map((book, index) => (
              <tr key={book._id}>
                <th>{itemsPerPage*(currentPage -1 ) + index + 1 }</th>
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

        {/* //rows per page */}
        <div className="d-inline-block mb-3">
                <span className="me-2">Rows per page: </span>
                <select className="form-select-sm" value={itemsPerPage} onChange={handleItemsPerPageChange}>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
        </div>

        {/* pagination code */}
        <div className="d-flex justify-content-center my-4">
          <button
            className="btn btn-primary me-2"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="align-self-center">Page {currentPage}</span>
          <button className="btn btn-primary ms-2" onClick={nextPage}>
            Next
          </button>
        </div>

      </div>
    </div>
  );
};

export default Home;
