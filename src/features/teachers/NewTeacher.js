import { useGetClassesQuery } from "../classes/classesApiSlice"
import NewTeacherForm from "./NewTeacherForm"

const NewTeacher = () => {
    const { classes = [] } = useGetClassesQuery('classesList', {
        selectFromResult: ({ data }) => {
            const classes = Object.values(data?.entities || {}).map(_class => ({
                id: _class.id,
                name: _class.name
            }))
            console.log(classes)
            return {
                classes
            }
        }
    })

    console.log(classes)

    const content = <NewTeacherForm classes={classes} />
  return content
}
export default NewTeacher