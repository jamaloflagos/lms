import { useParams } from "react-router-dom";
import { useGetClassesQuery } from "../classes/classesApiSlice"
import EditCourseForm from "./EditCourseForm";
import { useGetCoursesQuery } from "./coursesApiSlice";

const EditCourse = () => {
    const { id } = useParams();
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

    const { course } = useGetCoursesQuery('coursesList', {
        selectFromResult: ( { data }) => ({
            course: data?.entities[id]
        })
    })

    const content = <EditCourseForm classes={classes} course={course} />

    return content
}
export default EditCourse