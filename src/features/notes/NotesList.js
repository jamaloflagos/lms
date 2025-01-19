import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useGetNotesQuery } from "./notesApiSlice";

const NotesList = ({ outlineId }) => {
  const { status } = useAuth();
  const { notes = [], isLoading, isSuccess, isError, error } = useGetNotesQuery(
    outlineId,
    {
      selectFromResult: (result) => {
        const notes = Object.values(result?.data?.entities || {}).map((note) => ({
          id: note.id,
          title: note.title,
        }));

        return {
          notes,
          ...result,
        };
      },
    }
  );

  let content;

  if (isLoading)
    content = <p className="text-gray-600 text-center">Loading...</p>;

  if (isError)
    content = <p className="text-red-500 text-center">{error?.data?.message}</p>;

  if (isSuccess) {
    if (notes.length === 0) {
      content = (
        <div className="text-center py-4 bg-gray-50 rounded-md shadow-sm">
          <p className="text-gray-600 font-medium">
            No notes are available for this outline.
          </p>
        </div>
      );
    } else {
      const listItems = notes.map((note) => (
        <li
          key={note.id}
          className="border-b last:border-none py-3 px-4 hover:bg-gray-50 transition duration-200"
        >
          <Link
            to={`/${
              status?.toLowerCase()
            }/subjects/outlines/${outlineId}/notes/${note.id}`}
            className="flex justify-start items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <span className="font-medium">{note.title}</span>
          </Link>
        </li>
      ));

      content = (
        <ul className="bg-white shadow-md rounded-lg divide-y divide-gray-200">
          {listItems}
        </ul>
      );
    }
  }

  return content;
};

export default NotesList;
