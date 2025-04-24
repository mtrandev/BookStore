import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MdOutlineAddBox } from 'react-icons/md';
import Spinner from '../src/components/Spinner.jsx';
import BooksTable from '../src/components/home/BooksTable.jsx';
import BooksCard from '../src/components/home/BooksCard.jsx';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("card"); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleDeleteBook = (id) => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setBooks(books.filter(book => book._id !== id));
        setLoading(false);
        setIsModalOpen(false); 
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setIsModalOpen(false); 
      });
  };

  const openModal = (bookId) => {
    setBookToDelete(bookId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setBookToDelete(null);
  };

  return (
    <div className="p-8 bg-[#f0e6d2] min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-semibold text-[#3e2a47] mb-4">
          Book Store
        </h1>

        <div className="flex gap-6">
          <button
            onClick={() => setShowType("table")}
            className="bg-[#8e735b] text-white py-3 px-6 rounded-lg hover:bg-[#6a4f36] transition-all duration-300 ease-out shadow-md transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#3e2a47] focus:ring-offset-2"
          >
            Table
          </button>
          <button
            onClick={() => setShowType("card")}
            className="bg-[#8e735b] text-white py-3 px-6 rounded-lg hover:bg-[#6a4f36] transition-all duration-300 ease-out shadow-md transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#3e2a47] focus:ring-offset-2"
          >
            Card
          </button>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4">
          <BooksTable books={books} openModal={openModal} />
        </div>
      ) : (
        <BooksCard books={books} openModal={openModal} />
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h3 className="text-xl mb-4">Are you sure you want to delete this book?</h3>
            <div className="flex justify-between gap-4">
              <button
                className="p-3 w-full bg-gray-600 text-white rounded-lg"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="p-3 w-full bg-red-600 text-white rounded-lg"
                onClick={() => handleDeleteBook(bookToDelete)}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
