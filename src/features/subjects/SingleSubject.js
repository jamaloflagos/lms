import { Link } from "react-router-dom";
import { useGetSubjectsQuery } from "./subjectsApiSlice";
import OutlineLists from "../outlines/OutlineLists";
import useAuth from "../../hooks/useAuth";
import Scores from "../scores/Scores";

const SingleSubject = ({ subjectId }) => {
  const formattedSubjectId = subjectId.split("_")[1];
  const formattedClassId = subjectId.split("_")[0];
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
        <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
          <header className="space-y-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              {subject.subject_name}
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                to={`outlines/new/${subject.class_id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add New Outline
              </Link>
              <Link
                to={`/teacher/subjects/${formattedSubjectId}/exams/new/${formattedClassId}`}
                className="px-4 py-2 bg-green text-white rounded hover:bg-green-700"
              >
                Add New Exam
              </Link>
              <Link
                to={`/teacher/subjects/${formattedSubjectId}/assignments/new/${formattedClassId}`}
                className="px-4 py-2 bg-yellow text-white rounded hover:bg-yellow-600"
              >
                Add New Assignment
              </Link>
              <Link
                to={`/teacher/subjects/${formattedSubjectId}/tests/new/${formattedClassId}`}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Add New Test
              </Link>
            </div>
          </header>
          <section className="space-y-4">
            <h2 className="text-xl font-medium text-gray-700">Outlines</h2>
            <OutlineLists
              subjectId={subject.subject_id}
              classId={subject.class_id}
            />
          </section>
        </div>
      );
    } else if (status === "Student") {
      content = (
        <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
          <header className="space-y-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              {subject.subject_name}
            </h1>
          </header>
          <section className="space-y-4">
            <h2 className="text-xl font-medium text-gray-700">Outlines</h2>
            <OutlineLists subjectId={subject.id} classId={class_id} />
          </section>
          <section className="space-y-4">
            <h2 className="text-xl font-medium text-gray-700">Scores</h2>
            <Scores subjectId={subject.subject_id} />
          </section>
        </div>
      );
    }
  } else content = null;
  return content;
};

export default SingleSubject;
