import { useNavigate } from "react-router-dom";
import { useAddNewClassMutation } from "./classesApiSlice";
import { useEffect, useState } from "react";

const NewClassForm = () => {
  const navigate = useNavigate();
  const [addNewClass, { isLoading, isSuccess, isError, error }] =
    useAddNewClassMutation();

  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [category, setCategory] = useState("");

  const canSave = [name, nickName, category].every(Boolean) && !isLoading;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewClass({ name, nick_name: nickName, category });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setName("");
      setNickName("");
      setCategory("");
      navigate("/admin/classes");
    }
  }, [isSuccess, navigate]);

  const content = (
    <>

      <form onSubmit={onSubmit}>
      {isError && <p>{error?.data?.message}</p>}
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
            <option value="">Select Category</option>
            <option value="Secondary">Secondary</option>
            <option value="Primary">Primary</option>
          </select>
        </label>
        <button type="submit">Save</button>
      </form>
    </>
  );

  return content;
};

export default NewClassForm;
