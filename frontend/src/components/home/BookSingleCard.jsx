import { Link, useNavigate } from "react-router-dom";  
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import BookModal from "./BookModal.jsx";

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const navigate = useNavigate(); 

  const handleDelete = () => {
    navigate(`/books/delete/${book._id}`);
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 m-4 shadow hover:shadow-md transition duration-300 bg-gray-50">
      
      <div className="flex justify-center mb-4">
        <img
          src={book.coverImage || "https://via.placeholder.com/300x400"}
          alt={book.title}
          className="w-[300px] h-[400px] object-cover rounded-md shadow"
        />
      </div>

      
      <div className="flex items-center gap-2 mb-2">
        <PiBookOpenTextLight className="text-gray-600 w-[32px] h-[32px]" />
        <h2
          className="text-lg font-semibold truncate w-[200px] whitespace-nowrap overflow-hidden"
          title={book.title}
        >
          {book.title}
        </h2>
      </div>

      
      <div className="flex items-center gap-2 mb-1">
        <BiUserCircle className="text-gray-600 w-[32px] h-[32px]" />
        <h2
          className="text-md truncate whitespace-nowrap overflow-hidden"
          title={book.author}
        >
          {book.author}
        </h2>
      </div>

      
      <p className="text-sm text-gray-500 mb-2">{book.publishYear}</p>

      
      <div className="flex justify-between items-center gap-4 mt-4">
        <BiShow
          className="text-2xl text-gray-700 hover:text-black cursor-pointer"
          onClick={() => setShowModal(true)}
        />
        <Link to={`/books/details/${book._id}`}>
          <BsInfoCircle className="text-2xl text-green-700 hover:text-black" />
        </Link>
        <Link to={`/books/edit/${book._id}`}>
          <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-black" />
        </Link>
        
        <button
          onClick={handleDelete}  
          className="text-2xl text-red-600 hover:text-black"
        >
          <MdOutlineDelete />
        </button>
      </div>

      
      {showModal && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}

      
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Are you sure you want to delete this book?
            </h3>
            <div className="flex justify-between gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookSingleCard;
