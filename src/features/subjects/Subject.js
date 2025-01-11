import { Link, useParams } from "react-router-dom";
import { useGetSubjectsQuery } from "./subjectsApiSlice";
import OutlineLists from "./OutlineLists";

const Subject = () => {
  const { id: subjectId } = useParams();
  const { subject } = useGetSubjectsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      subject: data?.entities[subjectId],
    }),
  });

  let content;
  if (subject) {
    content = (
      <>
        <article>
          <header>
            <Link to={""}>Add New Outline</Link>
          </header>
          <section>
            <h1>{subject.name}</h1>
            <OutlineLists subjectId={subject.id} classId={subject._class.id} />
          </section>
        </article>
      </>
    );
  } else content = null;
  return content;
};
export default Subject;
