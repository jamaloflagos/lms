import { useNavigate } from "react-router-dom";
import { useAddNewGroupMutation } from "./groupsApiSlice";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const NewGroupForm = () => {
    const { id } = useAuth()
  const navigate = useNavigate();
  const [addNewGroup, { isLoading, isSuccess, isError, error }] =
    useAddNewGroupMutation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [creator, setCreator] = useState("");

  const canSave = [name, description, creator].every(Boolean) && !isLoading;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewGroup({
        name,
        description,
        creator: id
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setName("");
      setDescription("");
      setCreator("");
      navigate();
    }
  }, [isSuccess, navigate]);

  const content = (
    <>
      {isError && <p>{error?.data?.message}</p>}

      <form onSubmit={onSubmit}>
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

        <button type="submit">Save</button>
      </form>
    </>
  );

  return content;
};

export default NewGroupForm;
