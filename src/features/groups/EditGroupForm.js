import { useNavigate } from "react-router-dom";
import {
  useUpdateGroupMutation,
  useDeleteGroupMutation,
} from "./groupsApiSlice";
import { useEffect, useState } from "react";
import DeletePromptModal from "../../components/DeletePromptModal";

const EditGroupForm = ({ group, students }) => {
  const navigate = useNavigate();
  const [updateGroup, { isLoading, isSuccess, isError, error }] =
    useUpdateGroupMutation();
  const [deleteGroup, { isSuccess: isDelSuccess, isError: isDelError, error: delError }] =
    useDeleteGroupMutation();

  const [canDelete, setCanDelete] = useState(false);
  const [displayDeletePrompt, setDisplayDeletePrompt] = useState(false);

  const [name, setName] = useState(group.name);
  const [description, setDescription] = useState(group.description);

  const canSave = [name, description].every(Boolean) && !isLoading;

  const onSaveGroupClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await updateGroup({
        id: group.id,
        name,
        description
      });
    }
  };

  const onDeleteGroupClicked = async () => {
    if (canDelete) {
      await deleteGroup({ id: group.id });
    }
  };

  const errContent = (error?.data?.message || delError?.data?.message) ?? "";

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setName("");
      setDescription("");
      navigate();
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const content = (
    <>
      {(isError || isDelError) && <p>{errContent}</p>}

      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <h2>Edit Group: {group.name}</h2>
          <div>
            <button onClick={onSaveGroupClicked}>Save</button>
            <button onClick={onDeleteGroupClicked}>Delete</button>
          </div>
        </div>

        <label htmlFor="name">
          Group Name:
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label htmlFor="description">
          Description:
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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

export default EditGroupForm;
