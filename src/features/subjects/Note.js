import { Link, useParams } from "react-router-dom";
import { useGetNotesQuery } from "./subjectsApiSlice";
import useAuth from "../../hooks/useAuth";

const Note = () => {
  const { status } = useAuth();
  const { id: noteId, outlineId } = useParams();
  const { note } = useGetNotesQuery(outlineId, {
    selectFromResult: ({ data }) => ({
      note: data?.entities[noteId],
    }),
  });

  let content;

  if (note) {
    content = (
      <>
        <header>
          <h1>{note.title}</h1>
          {status === "Teacher" && <Link to={""}>Edit</Link>}
        </header>
        <article>
          <section>
            <p>{note.content}</p>
          </section>
        </article>
      </>
    );
  } else content = null;

  return content;
};
export default Note;
