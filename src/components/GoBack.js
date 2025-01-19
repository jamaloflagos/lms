import { useNavigate } from "react-router-dom";

const GoBack = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 bg-white p-2 rounded-md shadow-md hover:shadow-lg border border-gray-200"
    >
      <i className="fa-solid fa-arrow-left"></i>
      <span className="font-medium">Go Back</span>
    </button>
  );
};

export default GoBack;
