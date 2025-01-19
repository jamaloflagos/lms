import { useEffect, useState } from "react";
import { useUpdateOutlineMutation } from "./outlinesApiSlice";
import SuccessPromptModal from "../../components/SuccessPromptModal";
const EditOutlineForm = ({ outline, class_id, subject_id }) => {
  const [updateOutline, { isLoading, isSuccess, isError, error }] =
    useUpdateOutlineMutation();
  const [title, setTitle] = useState(outline?.title);
  const [week, setWeek] = useState(outline?.week);
  const [errors, setErrors] = useState({});
  const [displaySuccessModal, setDisplaySuccessModal] = useState(false)

  const canSave =
    [title, week].every(Boolean) && !isLoading;

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
      await updateOutline({ id: outline.id, title, week, class_id, subject_id });
    }
  };

  useEffect(() => {
    if (isSuccess) {
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

export default EditOutlineForm;