import { useEffect, useState } from "react";
import { useAddNewNoteMutation } from "./notesApiSlice";
import SuccessPromptModal from "../../components/SuccessPromptModal";

const NewNoteForm = ({ outlineId }) => {
  const [title, setTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [errors, setErrors] = useState({});
  const [displaySuccessModal, setDisplaySuccessModal] = useState(false)

  const [addNewNote, { isLoading, isSuccess, isError, error }] =
    useAddNewNoteMutation();

  const canSave = [outlineId, title, noteContent].every(Boolean) && !isLoading;

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Title is required.";
    if (!noteContent) newErrors.noteContent = "Content is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateForm() && canSave) {
      await addNewNote({ outline: outlineId, title, content: noteContent });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setNoteContent("");
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
          Add New Note
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
          <label htmlFor="noteContent" className="block text-gray-700">
            Content:
          </label>
          <textarea
            id="noteContent"
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          ></textarea>
          {errors.noteContent && (
            <p className="text-red-500 text-sm mt-1">{errors.noteContent}</p>
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

export default NewNoteForm;
