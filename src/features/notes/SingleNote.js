import { Link } from "react-router-dom";
import { useGetNotesQuery } from "./notesApiSlice";
import useAuth from "../../hooks/useAuth";

const SingleNote = ({ noteId, outlineId }) => {
  const { status } = useAuth();
  const { note } = useGetNotesQuery(outlineId, {
    selectFromResult: ({ data }) => ({
      note: data?.entities[noteId],
    }),
  });

  let content;

  if (note) {
    content = (
      <>
        <article className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto my-6">
          <header className="border-b pb-4 mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">{note.title}</h1>
            {status === "Teacher" && (
              <Link
                to={`edit`}
                className="text-blue-600 hover:text-blue-800 font-medium mt-2 inline-block"
              >
                Edit
              </Link>
            )}
          </header>
          <section>
            <p className="text-gray-700 leading-relaxed">{note.content}</p>
          </section>
        </article>
      </>
    );
  } else content = null;

  return content;
};

export default SingleNote;
