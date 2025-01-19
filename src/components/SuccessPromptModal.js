const SuccessPromptModal = ({ setDisplaySuccessModal }) => {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <p className="text-lg font-semibold text-green-600">The operation was successful</p>
          <div className="flex justify-center mt-4">
            <div className="bg-green-500 text-white p-4 rounded-full">
              <i className="fa-solid fa-check text-3xl"></i>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setDisplaySuccessModal(false)}
              className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 focus:outline-none"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default SuccessPromptModal;