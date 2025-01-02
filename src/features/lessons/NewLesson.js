import { useGetModulesQuery } from "../modules/modulesApiSlice"
import NewLessonForm from "./NewLessonForm"

const NewLesson = () => {
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

    const content = <NewLessonForm modules={modules} />
  return content
}
export default NewLesson