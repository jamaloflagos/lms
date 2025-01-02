import { useGetLessonsQuery } from "./lessonsApiSlice"
import { Link } from "react-router-dom"

const LessonsList = ({ moduleId }) => {
  const { lessons = [], isLoading, isSuccess, isError, error } = useGetLessonsQuery('lessonsList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    selectFromResult: (result) => {
      const lessons =  Object.values(result?.data?.entities || {}).map(lesson => ({
        id: lesson.id,
        title: lesson.title
      }))
      return {
        ...result,
        lessons
      }
    }
  
  })

  let content;

  if (isLoading) content = <p>Loading...</p>

  if (isError) content = <p>{error?.data?.message}</p>

  if (isSuccess) {
    const listItems = lessons.map(lesson => (
      <li key={lesson.id}>
        <Link>{lesson.title}</Link>
      </li>
    ))

    content = (
      <ul>
        {listItems}
      </ul>
    )
  }
  return content
}
export default LessonsList