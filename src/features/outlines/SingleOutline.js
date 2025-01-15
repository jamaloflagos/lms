import { Link } from "react-router-dom";
import { useGetOutlinesQuery } from "./outlinesApiSlice";
import NotesList from "../notes/NotesList";
import useAuth from "../../hooks/useAuth";

const SingleOutline = ({ outlineId, classId, subjectId}) => {
  const { status } = useAuth();
  const { outline } = useGetOutlinesQuery(
    { class_id: classId, subject_id: subjectId },
    {
      selectFromResult: ({ data }) => ({
        outline: data?.entitie[outlineId],
      }),
    }
  );

  let content;

  if (outline) {
    content = (
      <>
        <article>
          <header>
            <span>{outline.title}</span>
            <span>{outline.week}</span>
          </header>
          <section>
            <h1>Notes</h1>
            <div>
              {status === "Teacher" && (
                <Link to={`/teacher/subjects/outlines/${outline.id}/notes/new`}>
                  Add New Note
                </Link>
              )}
              {status === "Teacher" && (
                <Link to={`/teacher/subjects/outlines/${outline.id}/edit`}>
                  Edit Outline
                </Link>
              )}
            </div>
          </section>
          <div>
            <NotesList outlineId={outline.id} />
          </div>
        </article>
      </>
    );
  } else content = null;

  return content;
};
export default SingleOutline;
