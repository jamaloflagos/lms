import { useUpdateGroupMutation } from "./groupsApiSlice";
import { useEffect, useState } from "react";
import SuccessPromptModal from "../../components/SuccessPromptModal";

const EditGroupForm = ({ group }) => {
  const [updateGroup, { isLoading, isSuccess, isError, error }] =
    useUpdateGroupMutation();

  const [name, setName] = useState(group.name);
  const [displaySuccessModal, setDisplaySuccessModal] = useState(false);

  const canSave = [name].every(Boolean) && !isLoading;

  const onSaveGroupClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await updateGroup({
        id: group.id,
        name,
      });
    }
  };

  const errContent = error?.data?.message ?? "";

  useEffect(() => {
    if (isSuccess) {
      setName("");
      setDisplaySuccessModal(true);
    }
  }, [isSuccess]);

  const content = (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      {isError && (
        <p className="text-red-500 text-center mb-4">{errContent}</p>
      )}
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Edit Group: {group.name}
        </h1>
      </header>

      <form onSubmit={onSaveGroupClicked} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Group Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter group name"
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!canSave}
            className={`px-4 py-2 rounded-lg text-white ${
              canSave
                ? "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>

      {displaySuccessModal && (
        <SuccessPromptModal setDisplaySuccessModal={setDisplaySuccessModal} />
      )}
    </div>
  );

  return content;
};

export default EditGroupForm;
