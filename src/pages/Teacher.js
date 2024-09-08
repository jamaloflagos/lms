import { useCustomQuery } from "../hooks/useCustomQuery";

const TeacherList = () => {
    const { data: teacher, isLoading, isError, error } = useCustomQuery(['teacher', '']);

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error fetching teachers due to {error.message}</div>
  return (
    <div>
        {teacher && (
            <div>
                <div>
                    <span>{teacher.first_name} {teacher.last_name}</span>
                    {teacher.is_form_teacher && <span>Form Class: {teacher._class}</span>}
                </div>
                <div>
                    <h5>Subjects</h5>
                    {
                        teacher.subjects.map(subject => (
                            <h6>{subject}</h6>
                        ))
                    }
                </div>
            </div>
        )}
    </div>
  )
}
export default TeacherList