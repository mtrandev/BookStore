import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../src/components/BackButton.jsx';
import Spinner from '../src/components/Spinner.jsx';

const ShowBook = () => {
  const [book, setBook] = useState(null);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("An error occurred while fetching the book data.");  
        setLoading(false);
        console.log(error);
      });
  }, [id]);  

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-center text-red-500 font-bold">{error}</p>;  
  }

  if (!book) {
    return <p className="text-center text-red-500 font-bold">Book not found!</p>;  
  }

  return (
    <div className="p-4 flex justify-center">
      <div className="w-full max-w-3xl">
        <BackButton />
        <h1 className="text-3xl my-8 font-serif text-center">{book.title}</h1> 
        <div className="flex flex-col border-2 border-[#d2c3b3] rounded-xl w-full p-6 bg-[#f3eee6] shadow-lg">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500 font-serif">Id:</span>
            <span>{book._id}</span>  
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500 font-serif">Title:</span>
            <span>{book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500 font-serif">Author:</span>
            <span>{book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500 font-serif">Publish Year:</span>
            <span>{book.publishYear}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500 font-serif">Create Time:</span>
            <span>{new Date(book.createdAt).toLocaleString()}</span>  
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500 font-serif">Last Update Time:</span>
            <span>{new Date(book.updatedAt).toLocaleString()}</span>  
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowBook;
