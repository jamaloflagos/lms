import { Link } from "react-router-dom";
import { useGetSubjectsQuery } from "./subjectsApiSlice";
import OutlineLists from "../outlines/OutlineLists";
import useAuth from "../../hooks/useAuth";
import Scores from "../scores/Scores";

const SingleSubject = ({ subjectId }) => {
  const { status, user_id: teacher_id, class_id } = useAuth();
  const subjectFilter = status === "Student" ? { class_id } : { teacher_id };
  const { subject } = useGetSubjectsQuery(
    { subjectFilter, status },
    {
      selectFromResult: ({ data }) => ({
        subject: data?.entities[subjectId],
      }),
    }
  );

  let content;
  if (subject) {
    if (status === "Teacher") {
      content = (
        <>
          <header>
            <h1>{subject.subject_name}</h1>
            <Link to={`outlines/new/${subject.class_id}`}>Add New Outline</Link>
          </header>
          <section>
            <h1>Outlines</h1>
            <OutlineLists
              subjectId={subject.subject_id}
              classId={subject.class_id}
            />
          </section>
        </>
      );
    } else if (status === "Student") {
      content = (
        <>
          <header>
            <h1>{subject.subject_name}</h1>
          </header>
          <section>
            <h1>Outlines</h1>
            <OutlineLists subjectId={subject.id} classId={class_id} />
          </section>
          <section>
            <h1>Scores</h1>
            <Scores subjectId={subject.subject_id} />
          </section>
        </>
      );
    }
  } else content = null;
  return content;
};
export default SingleSubject;
