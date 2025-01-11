import { useEffect, useState } from "react";
import { useUpdateNewOutlineMutation } from "./subjectsApiSlice";
import { useNavigate } from "react-router-dom";

const EditOutlineForm = ({ outline }) => {
  const [updateOutline, { isLoading, isSuccess, isError, error }] =
    useUpdateNewOutlineMutation();
  const [title, setTitle] = useState(outline.title);
  const [week, setWeek] = useState(outline.week);
  const navigate = useNavigate();

  const canSave = [title, week].every(Boolean) && !isLoading;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      await updateOutline({ id: outline.id, title, week });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setWeek("");
      navigate("");
    }
  }, [isSuccess, navigate]);

  const content = (
    <>
      <article>
        <header>
          <h1>Edit Outline</h1>
        </header>
      </article>
      <form onSubmit={onSubmit}>
        {isError && <p>{error?.data?.message}</p>}
        <label htmlFor="title">
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label htmlFor="week">
          <input
            type="number"
            id="week"
            value={week}
            onChange={(e) => setWeek(e.target.valueAsNumber)}
          />
        </label>
        <button>Save</button>
      </form>
    </>
  );

  return content;
};
export default EditOutlineForm;
