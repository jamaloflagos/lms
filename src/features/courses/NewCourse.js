import { useGetClassesQuery } from "../classes/classesApiSlice"
import NewCourseForm from "./NewCourseForm";

const NewCourse = () => {
    const { classes } = useGetClassesQuery('classesList', {
        selectFromResult: ({ data }) => {
            const classes = Object.values(data?.entities).map(item => ({
                id: item.id,
                title: item.title
            }))

            return {
                classes
            }
        }
    });

    const content = <NewCourseForm classes={classes} />

    return content
}
export default NewCourse