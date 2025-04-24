import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [description, setDescription] = useState(''); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleCreateBook = (e) => {
    e.preventDefault();

    if (!title || !author || !publishYear || !description) {
      enqueueSnackbar('All fields are required!', { variant: 'error' });
      return;
    }

    const newBook = {
      title,
      author,
      publishYear,
      coverImage: imageURL,
      description, 
    };

    setLoading(true);
    axios
      .post('http://localhost:5555/books', newBook)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book created!', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error creating book.', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="p-8 bg-[#f0e6d2] min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-semibold text-[#3e2a47] mb-8">Create Book</h1>

      <form onSubmit={handleCreateBook} className="w-full max-w-md bg-white rounded-lg shadow-xl p-6">
        <label className="block text-lg text-[#3e2a47] mb-2">Title:</label>
        <input
          className="w-full p-3 mb-4 border border-[#d0c4b2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8e735b]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="block text-lg text-[#3e2a47] mb-2">Author:</label>
        <input
          className="w-full p-3 mb-4 border border-[#d0c4b2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8e735b]"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <label className="block text-lg text-[#3e2a47] mb-2">Publish Year:</label>
        <input
          type="number"
          className="w-full p-3 mb-4 border border-[#d0c4b2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8e735b]"
          value={publishYear}
          onChange={(e) => setPublishYear(e.target.value)}
        />

        <label className="block text-lg text-[#3e2a47] mb-2">Image URL:</label>
        <input
          type="text"
          className="w-full p-3 mb-4 border border-[#d0c4b2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8e735b]"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        />

        <label className="block text-lg text-[#3e2a47] mb-2">Description:</label>
        <textarea
          className="w-full p-3 mb-4 border border-[#d0c4b2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8e735b]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
        ></textarea>

        {imageURL && (
          <div className="flex justify-center mb-4">
            <img
              src={imageURL}
              alt="Cover"
              className="w-[300px] h-[400px] object-cover rounded-md shadow-lg"
            />
          </div>
        )}

        <div className="flex justify-between gap-4">
          <button
            type="submit"
            className="w-full bg-[#8e735b] text-white py-3 px-6 rounded-xl shadow-md hover:bg-[#6a4f36] transition-all duration-300"
          >
            {loading ? 'Saving...' : 'Create Book'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full bg-gray-400 text-white py-3 px-6 rounded-xl shadow-md hover:bg-gray-500 transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBook;
