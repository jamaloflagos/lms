import { useCustomQuery } from "../hooks/useCustomQuery";
import { useParams } from 'react-router-dom'

const Attendances = () => {
    const {studentId} = useParams();
    console.log(studentId)
    const {data: attendances, isLoading, isError, error} = useCustomQuery(["attendances", studentId], `http://127.0.0.1:8000/attendances?student_id=${studentId}`);
  console.log(attendances);
    if (isLoading) return <div>Loading data...</div>;
  if (isError) return <div>{error.message}</div>;
  return (
<div>
  {
    attendances.length > 0 ? (
      <>
        <h1>{attendances[0].student_details.name}</h1>
        {attendances.map((attendance) => (
          <div key={attendance.id}>
            <span>{attendance.date_marked}</span>
            <span>{attendance.status}</span>
          </div>
        ))}
      </>
    ) : (
      <p>No attendance marked for this student</p>
    )
  }
</div>

  );
};
export default Attendances;
