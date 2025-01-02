import { useNavigate } from "react-router-dom";
import { useUpdateModuleMutation } from "./modulesApiSlice";
import { useEffect, useState } from "react";
import DeletePromptModal from "../../components/DeletePromptModal";

const EditModuleForm = ({ module, courses }) => {
  const navigate = useNavigate();
  const [updateModule, { isLoading, isSuccess, isError, error }] =
    useUpdateModuleMutation();
  const [deleteModule, { isDelSuccess, isDelError, delError }] =
    useUpdateModuleMutation();
  const [canDelete, setCanDelete] = useState(false);
  const [displayDeletePrompt, setDisplayDeletePrompt] = useState(false);

  const [title, setTitle] = useState(module.title);
  const [course, setCourse] = useState(module.course);
  const [estimatedTime, setEstimatedTime] = useState(module.estimated_time);

  const canSave = [title, course, estimatedTime].every(Boolean) && !isLoading;

  const onSaveModuleClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await updateModule({ id: module.id, title, course, estimated_time: estimatedTime });
    }
  };

  const onDeleteModuleClicked = async () => {
    if (canDelete) {
      await deleteModule({ id: module.id });
    }
  };

  const errContent = (error?.data?.message || delError?.data?.message) ?? "";

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle("");
      setCourse("");
      setEstimatedTime("");
      navigate();
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const options = courses.map((course) => (
    <option value={course.id} key={course.id}>
      {course.title}
    </option>
  ));

  const content = (
    <>
      {(isError || isDelError) && <p>{errContent}</p>}

      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <h2>Edit Course #{course.title}</h2>
          <div>
            <button onClick={onSaveModuleClicked}>Save</button>
            <button onClick={onDeleteModuleClicked}>Delete</button>
          </div>
        </div>
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
        {displayDeletePrompt && (
          <DeletePromptModal
            setCanDelete={setCanDelete}
            setDisplayDeletePrompt={setDisplayDeletePrompt}
          />
        )}
      </form>
    </>
  );

  return content;
};
export default EditModuleForm;
