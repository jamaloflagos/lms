import { useParams } from "react-router-dom"
import { useGetModulesQuery } from "../modules/modulesApiSlice"
import { useGetLessonsQuery } from "./lessonsApiSlice"
import EditLessonForm from "./EditLessonForm"

const EditLesson = () => {
    const { id } = useParams()
    const { modules } = useGetModulesQuery('modulesList', {
        selectFromResult: ({ data }) => {
            const modules = Object.values(data?.entities).map(module => ({
                id: module.id,
                title: module.title
            }))

            return {
                modules
            }
        }
    })

    const { lesson } = useGetLessonsQuery('LessonsList', {
        selectFromResult: ({ data }) => ({
            lesson: data?.entities[id]
        })
    })

    const content = <EditLessonForm modules={modules} lesson={lesson} />
  return content
}
export default EditLesson