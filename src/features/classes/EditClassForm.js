import { useNavigate } from "react-router-dom";
import { useUpdateClassMutation, useDeleteClassMutation } from "./classesApiSlice";
import { useEffect, useState } from "react";
import DeletePromptModal from "../../components/DeletePromptModal";

const EditClassForm = ({ classData }) => {
  const navigate = useNavigate();
  const [updateClass, { isLoading, isSuccess, isError, error }] =
    useUpdateClassMutation();
  const [deleteClass, { isSuccess: isDelSuccess, isError: isDelError, error: delError }] =
    useDeleteClassMutation();

  const [canDelete, setCanDelete] = useState(false);
  const [displayDeletePrompt, setDisplayDeletePrompt] = useState(false);

  const [name, setName] = useState(classData.name);
  const [nickName, setNickName] = useState(classData.nick_name);
  const [category, setCategory] = useState(classData.category);

  const canSave = [name, nickName, category].every(Boolean) && !isLoading;

  const onSaveClassClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await updateClass({ id: classData.id, name, nick_name: nickName, category });
    }
  };

  const onDeleteClassClicked = async () => {
    if (canDelete) {
      await deleteClass({ id: classData.id });
    }
  };

  const errContent = (error?.data?.message || delError?.data?.message) ?? "";

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setName("");
      setNickName("");
      setCategory("");
      navigate();
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const content = (
    <>
      {(isError || isDelError) && <p>{errContent}</p>}

      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <h2>Edit Class #{classData.name}</h2>
          <div>
            <button onClick={onSaveClassClicked}>Save</button>
            <button onClick={onDeleteClassClicked}>Delete</button>
          </div>
        </div>
        
        <label htmlFor="name">
          Name:
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="nickName">
          Nick Name:
          <input
            type="text"
            id="nickName"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
        </label>
        <label htmlFor="category">
          Category:
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="S">Secondary</option>
            <option value="P">Primary</option>
          </select>
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

export default EditClassForm;
