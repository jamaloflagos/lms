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
        <article>
        <header>
          <h1>{note.title}</h1>
          {status === "Teacher" && <Link to={`edit`}>Edit</Link>}
        </header>
          <section>
            <p>{note.content}</p>
          </section>
        </article>
      </>
    );
  } else content = null;

  return content;
};
export default SingleNote;
