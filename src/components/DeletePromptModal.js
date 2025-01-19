const DeletePromptModal = ({ setCanDelete, setDisplayDeletePrompt, resource }) => {
  const onYesClicked = () => {
    setCanDelete(true);
    setDisplayDeletePrompt(false);
  };

  const onNoClicked = () => {
    setCanDelete(false);
    setDisplayDeletePrompt(false);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <p className="text-lg font-semibold text-gray-800">Are you sure you want to delete this {resource}?</p>
        <div className="flex justify-around mt-6">
          <button
            onClick={onNoClicked}
            className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 focus:outline-none"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
          <button
            onClick={onYesClicked}
            className="bg-green text-white p-3 rounded-full hover:bg-green-600 focus:outline-none"
          >
            <i className="fa-solid fa-check text-xl"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePromptModal;