import { Link } from "react-router-dom";
import { useCustomQuery } from "../hooks/useCustomQuery";

const LessonList = ({subject, classId}) => {
    const {data: lessons, isLoading, isError, error} = useCustomQuery(['student', classId, subject], `http://127.0.0.1:8000/lessons?class_id=${classId}&subject=${subject}`)
    console.log(`lesson ${subject}`, lessons)
    console.log(classId);
    if (isLoading) return <div>Loading data...</div>
    if (isError) return <div>{error.message}</div>
  return (
    <div>
    {lessons.map((lesson) => (
      <div key={lesson.id}>
        <Link to={`/lesson/${lesson.topic}/${lesson.id}`}>{lesson.topic}</Link>
      </div>
    ))}
  </div>
  )
}
export default LessonList