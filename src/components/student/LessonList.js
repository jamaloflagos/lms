import { useCustomQuery } from "../../hooks/useCustomQuery";

const LessonList = ({ courseId, classId, moduleId }) => {
  const {
    data: lessons,
    isLoading,
    isError,
    error,
  } = useCustomQuery(
    ["course", courseId, classId, moduleId],
    `https://lms-api-xi.vercel.app/class/${classId}/courses/${courseId}/modules/${moduleId}/lessons`
  );

  if (isLoading) return <div>Laoding data...</div>;
  if (isError) return <div>Error fetching data due to: {error.message}</div>;
  return (
    <div>
      {lessons.length > 0 ? (
        lessons.map((lesson, idx) => (
          <div key={idx} className="lesson">
            <span className="lesson-title">{lesson.title}</span>
            <span className="lesson-info">{lesson.duration}</span>
            <span className="preview">Preview</span>
          </div>
        ))
      ) : (
        <p>No lessons available.</p>
      )}
    </div>
  );
};
export default LessonList;
