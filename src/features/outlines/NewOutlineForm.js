import { useEffect, useState } from "react";
import { useAddNewOutlineMutation } from "./outlinesApiSlice";
import SuccessPromptModal from "../../components/SuccessPromptModal";

const NewOutlineForm = ({ classId: class_id, subjectId: subject_id }) => {
  const [addNewOutline, { isLoading, isSuccess, isError, error }] =
    useAddNewOutlineMutation();
  const [title, setTitle] = useState("");
  const [week, setWeek] = useState("");
  const [errors, setErrors] = useState({});
  const [displaySuccessModal, setDisplaySuccessModal] = useState(false)
  console.log('====================================');
  console.log(error?.data);
  console.log('====================================');

  const canSave =
    [title, week, class_id, subject_id].every(Boolean) && !isLoading;

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Title is required.";
    if (!week) newErrors.week = "Week is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateForm() && canSave) {
      await addNewOutline({ title, week, class_id, subject_id });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setWeek("");
      setDisplaySuccessModal(true)
    }
  }, [isSuccess]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={onSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-lg"
      >
        <header className="mb-4 font-bold text-3xl text-blue-600">
          Add New Outline
        </header>
        {isError && (
          <p className="text-red-500 text-sm mb-4">{error?.data?.message}</p>
        )}

        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="week" className="block text-gray-700">
            Week:
          </label>
          <input
            type="number"
            id="week"
            value={week}
            onChange={(e) => setWeek(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.week && (
            <p className="text-red-500 text-sm mt-1">{errors.week}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
          // disabled={!canSave}
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </form>
      {displaySuccessModal && <SuccessPromptModal setDisplaySuccessModal={setDisplaySuccessModal} />}
    </div>
  );
};

export default NewOutlineForm;
