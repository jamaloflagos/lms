import { useState } from "react";
import { useCustomQuery } from "../hooks/useCustomQuery"
import TeacherForm from "./TeacherForm";
import { Link } from "react-router-dom";

const TeacherList = () => {
    const { data: teachers, isLoading, isError, error } = useCustomQuery(['teachers', '']);
    const [addTeacher, setAddteacher] = useState(false)

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error fetching teachers due to {error.message}</div>
  return (
    <div>
        {
          teachers.map(teacher => (
            <Link to={`teacher/${teacher.first_name} ${teacher.last_name}`}>
              <span>{teacher.first_name} {teacher.last_name}</span>
            </Link>
          ))
        }

        <div>
          <button onClick={() => setAddteacher(prev => !prev)}>Add New Teacher</button>
        </div>

        <div>
          {addTeacher && (
            <TeacherForm />
          )}
        </div>
    </div>
  )
}
export default TeacherList