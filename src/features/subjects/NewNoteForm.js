import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewNoteMutation } from "./subjectsApiSlice";

const NewNoteForm = (outlineId) => {
  const [title, setTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const navigate = useNavigate();

  const [addNewNote, { isLoading, isSuccess, isError, error }] =
    useAddNewNoteMutation();

  const canSave = [outlineId, title, noteContent].every(Boolean) && !isLoading;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewNote({ outline: outlineId, title, content: noteContent });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setNoteContent("");
      navigate("");
    }
  }, [isSuccess, navigate]);

  const content = (
    <>
      <article>
        <header>
          <h1>Add New Note</h1>
        </header>
      </article>
      <form onSubmit={onSubmit}>
        {isError && <p>{error?.data?.message}</p>}
        <label htmlFor="title">
          Title:
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label htmlFor="content">
          Content:
          <textarea
            id="content"
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
          ></textarea>
        </label>
        <button>Save</button>
      </form>
    </>
  );

  return content;
};
export default NewNoteForm;
