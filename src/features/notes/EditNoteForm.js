import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateNoteMutation } from "./notesApiSlice";
// import { useUpdateNoteMutation } from "../subjects/subjectsApiSlice";

const EditNoteForm = ({ note }) => {
  const [title, setTitle] = useState(note.title);
  const [noteContent, setNoteContent] = useState(note.content);
  const navigate = useNavigate();

  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation();

  const canSave = [title, noteContent].every(Boolean) && !isLoading;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      await updateNote({ id: note.id, title, content: noteContent });
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
          <h1>Edit Note</h1>
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
export default EditNoteForm;
