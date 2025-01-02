import { useNavigate } from "react-router-dom";
import { useAddNewModuleMutation } from "./modulesApiSlice";
import { useEffect, useState } from "react";

const NewModuleForm = ({ courses }) => {
  const navigate = useNavigate();
  const [addNewModule, { isLoading, isSuccess, isError, error }] =
    useAddNewModuleMutation();
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");

  const canSave = [title, course, estimatedTime].every(Boolean) && !isLoading;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewModule({ title, course, estimated_time: estimatedTime });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setCourse("");
      setEstimatedTime("");
      navigate();
    }
  }, [isSuccess, navigate]);

  const options = courses.map((course) => (
    <option value={course.id} key={course.id}>
      {course.title}
    </option>
  ));

  const content = (
    <>
      {isError && <p>{error?.data?.message}</p>}

      <form onSubmit={onSubmit}>
        <label htmlFor="title">
          Title:
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label htmlFor="course">
          Course:
          <select
            id="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          >
            {options}
          </select>
        </label>
        <label htmlFor="est_time">
          Estimated Time:
          <input
            type="text"
            id="est_time"
            value={estimatedTime}
            onChange={(e) => setEstimatedTime(e.target.value)}
          />
        </label>
        <button>Save</button>
      </form>
    </>
  );

  return content;
};
export default NewModuleForm;
