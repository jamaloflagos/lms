import { useCustomQuery } from "../hooks/useCustomQuery";
import { useParams } from "react-router-dom";

const Attendances = () => {
  const { studentId } = useParams();
  const {
    data: attendances,
    isLoading,
    isError,
    error,
  } = useCustomQuery(
    ["attendances", studentId],
    `https://lms-api-xi.vercel.app/attendances?student_id=${studentId}`
  );
  if (isLoading) return <div>Loading data...</div>;
  if (isError) return <div>{error.message}</div>;
  return (
    <main>
      {attendances.length > 0 ? (
        <div>
          <h1>{attendances[0].student_details.name}</h1>
          {attendances.map((attendance) => (
            <div key={attendance.id}>
              <span>{attendance.date_marked}</span>
              <span>{attendance.status}</span>
            </div>
          ))}
        </div>
      ) : (
        <p>No attendance marked for this student</p>
      )}
    </main>
  );
};
export default Attendances;
