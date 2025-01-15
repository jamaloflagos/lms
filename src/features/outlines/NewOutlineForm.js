import { useEffect, useState } from "react";
import { useAddNewOutlineMutation } from "./outlinesApiSlice";
import { useNavigate } from "react-router-dom";

const NewOutlineForm = ({ classId: class_id, subjectId: subject_id }) => {
  const [addNewOutline, { isLoading, isSuccess, isError, error }] =
    useAddNewOutlineMutation();
  const [title, setTitle] = useState("");
  const [week, setWeek] = useState("");
  const navigate = useNavigate();

  const canSave =
    [title, week, class_id, subject_id].every(Boolean) && !isLoading;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewOutline({ title, week, class_id, subject_id });
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
          <h1>Add New Outline</h1>
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
export default NewOutlineForm;
