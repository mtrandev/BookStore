import React, { useState } from 'react';
import Spinner from '../src/components/Spinner.jsx';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

export const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Deleted successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened.');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Delete Book</h1>

        {loading && <Spinner />}

        <div className="bg-gray-50 border-2 border-gray-300 rounded-xl p-6">
          <h3 className="text-xl text-center text-gray-700 mb-6">Are you sure you want to delete this book?</h3>
          <div className="flex justify-center gap-4">
            <button
              className="bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition duration-300"
              onClick={handleDeleteBook}
            >
              Yes, Delete it
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-gray-300 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-400 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
