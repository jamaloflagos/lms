import { Link, useParams } from "react-router-dom";
import { useGetOutlinesQuery } from "./subjectsApiSlice";
import NotesList from "./NotesList";
import useAuth from "../../hooks/useAuth";

const Outline = () => {
  const { id: outlineId, classId, subjectId } = useParams();
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
              {status === "Teacher" && <Link to={""}>Add New Note</Link>}
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
export default Outline;
