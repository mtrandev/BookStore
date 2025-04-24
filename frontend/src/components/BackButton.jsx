import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const BackButton = ({ destination = '/' }) => {
  return (
    <div className="flex justify-start my-4">
      <Link
        to={destination}
        className="bg-[#a67c52] text-white px-6 py-2 rounded-lg text-lg flex items-center hover:bg-[#8b5e3c] transition duration-300 ease-in-out"
      >
        <BsArrowLeft className="text-2xl mr-2" />
        Back
      </Link>
    </div>
  );
};

export default BackButton;
