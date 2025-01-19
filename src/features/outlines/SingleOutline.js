import { Link } from "react-router-dom";
import { useGetOutlinesQuery } from "./outlinesApiSlice";
import NotesList from "../notes/NotesList";
import useAuth from "../../hooks/useAuth";

const SingleOutline = ({ outlineId, classId, subjectId }) => {
  const { status } = useAuth();
  const { outline } = useGetOutlinesQuery(
    { class_id: classId, subject_id: subjectId },
    {
      selectFromResult: ({ data }) => ({
        outline: data?.entities[outlineId],
      }),
    }
  );

  let content;

  if (outline) {
    content = (
      <>
        <article className="bg-white shadow-md rounded-lg p-6 mb-6">
          <header className="flex justify-between items-center border-b pb-4 mb-4">
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                {outline.title}
              </h1>
              <p className="text-gray-500">Week {outline.week}</p>
            </div>
            <div className="space-x-4">
              {status === "Teacher" && (
                <Link
                  to={`/teacher/subjects/outlines/${outline.id}/notes/new`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Add New Note
                </Link>
              )}
              {status === "Teacher" && (
                <Link
                  to={`/teacher/subjects/outlines/${outline.id}/${classId}/${subjectId}/edit`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Edit Outline
                </Link>
              )}
            </div>
          </header>
          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Notes</h2>
            <NotesList outlineId={outline.id} />
          </section>
        </article>
      </>
    );
  } else {
    content = (
      <p className="text-gray-600 text-center">Outline not found or unavailable.</p>
    );
  }

  return content;
};

export default SingleOutline;
