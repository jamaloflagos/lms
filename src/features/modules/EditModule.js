import { useParams } from "react-router-dom"
import { useGetCoursesQuery } from "../courses/coursesApiSlice"
import EditModuleForm from "./EditModuleForm"
import { useGetModulesQuery } from "./modulesApiSlice"

const EditModule = () => {
    const { id } = useParams()
    const { courses } = useGetCoursesQuery('coursesList', {
        selectFromResult: ({ data }) => {
            const courses = Object.values.map(data?.entities).map(course => ({
                id: course.id,
                title: course.title
            }))
            return {
                courses
            }
        }
    })

    const { module } = useGetModulesQuery('modulesList', {
        selectFromResult: ({ data }) => ({
            module: data?.entities[id]
        })
    })

    const content = <EditModuleForm courses={courses} module={module} />
  return content
}
export default EditModule