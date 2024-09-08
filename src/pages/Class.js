import StudentList from "../components/StudentList";
import { useCustomQuery } from "../hooks/useCustomQuery"

const Class = () => {
    const { data: _class, isLoading, isError, error } = useCustomQuery(['_class', '']);

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error fetching class due to {error.message}</div>
  return (
    <div>
        {_class && (
            <div>
                <div>
                    <span>{_class.name} ({_class.nick_name})</span>
                    <span>Form Class: {_class.category}</span>
                </div>
                <div>
                    <h5>Subjects</h5>
                    {
                        _class.subjects.map(subject => (
                            <h6>{subject}</h6>
                        ))
                    }
                </div>

                <div>
                    <h5>Students</h5>
                    <StudentList classId={_class.id}/>
                </div>
            </div>
        )}
    </div>
  )
}
export default Class