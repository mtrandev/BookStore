import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const BookModal = ({ book, onClose }) => {
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    console.log("Navigating to delete:", book._id); 
    navigate(`/books/delete/${book._id}`);
  };

  return (
    <div
      className="fixed bg-black bg-opacity-60 inset-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[600px] max-w-full bg-white rounded-xl p-6 shadow-xl relative flex flex-col"
      >
        <AiOutlineClose
          className="absolute top-4 right-4 text-2xl text-gray-600 cursor-pointer hover:text-black"
          onClick={onClose}
        />

        <div className="flex items-center gap-2 mt-2">
          <PiBookOpenTextLight className="text-xl text-gray-600" />
          <h2 className="text-xl font-semibold">{book.title}</h2>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <BiUserCircle className="text-xl text-gray-600" />
          <h2 className="text-md">{book.author}</h2>
        </div>

        <p className="text-sm text-gray-500 mt-1 mb-4">
          {book.publishYear}
        </p>

        {book.coverImage && (
          <div className="flex justify-center mt-2 mb-4">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-[300px] h-[400px] object-cover rounded-md shadow"
            />
          </div>
        )}

        <p className="mt-2 text-sm text-gray-600">
          {book.description || "No description available."}
        </p>

        <div className="mt-6 flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Close
          </button>
          <button
            onClick={handleDeleteClick}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
