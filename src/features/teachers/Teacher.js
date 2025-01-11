import { useParams, Link } from "react-router-dom"
import { useGetTeachersQuery } from "./teachersApiSlice"

const Teacher = () => {
    const { id } = useParams()
    const { teacher } = useGetTeachersQuery('teachersList', {
        selectFromResult: ({ data }) => ({
            teacher: data?.entities[id]
        })
    })
    
    let content;

    if (teacher) {
        const listItems = (
            teacher.subjects.map(subject => (
                <li key={subject.id}>
                    <span>{subject.name}</span>
                    <span>Classes taught: {subject.classes.join(', ')}</span>
                </li>
            ))
        )
        content = (
            <div>
                <div>
                    <span>{teacher.first_name} {teacher.last_name}</span>
                    <Link to={`edit`}>Edit</Link>
                    {teacher.is_form_teacher && <span>Form Class: {teacher.form_class_details?.name}</span>}
                </div>
                <ul>
                    {listItems}
                </ul>
            </div>
        )

    } else content = null
  return content
}
export default Teacher