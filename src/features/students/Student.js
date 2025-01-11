import { useParams } from "react-router-dom"
import { useGetStudentsQuery } from "./studentsApiSlice"

const Student = () => {
    const { id } = useParams()
    const { student } = useGetStudentsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            student: data?.entities[id]
        })
    })

    let content;

    if (student) {
        content = (
            <div>
                <p>{student.first_name} {student.last_name}</p>
            </div>
        )
    } else content = null

  return content
}
export default Student