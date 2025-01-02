import NewCourseForm from "../courses/NewCourseForm"
import { useGetModulesQuery } from "./modulesApiSlice"

const NewModule = () => {
    const { courses } = useGetModulesQuery('modulesList', {
        selectFromResult: ({ data }) => {
            const courses = Object.values(data?.entities).map(course => ({
                id: course.id,
                title: course.title
            }))

            return courses
        }
    })

    const content = <NewCourseForm courses={courses} />

  return content
}
export default NewModule