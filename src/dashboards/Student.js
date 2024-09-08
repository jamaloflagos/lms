import { useEffect, useState } from "react";
import { useCustomQuery } from "../hooks/useCustomQuery";
import Subject from "../components/Subject";
import { useAuth } from "../hooks/useAuth";

const Student = () => {
  const { logout, userId } = useAuth();
  const {
    data: student,
    isLoading,
    isError,
    error,
  } = useCustomQuery(
    ["student", userId],
    `http://127.0.0.1:8000/students/${userId}`
  );
  const [subject, setSubject] = useState(null);

  useEffect(() => {
    if (student && student._class.subjects.length > 0) {
      setSubject(student._class.subjects[0]);
    }
  }, [student]);

  if (isLoading) return <div>Loading data...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <div>
      <nav>
        <div>
          <div>
            <span>{student.name}</span>
            <span>Dropdown button</span>
          </div>
          <div className="dropdown-content">
            <button onClick={logout}>Logout</button>
          </div>
        </div>
        <h5>Subjects</h5>
        {student.class_details.subjects.map((subject, index) => (
          <div key={index} onClick={() => setSubject(subject)}>
            {subject}
          </div>
        ))}
      </nav>
      {subject && (
        <Subject
          studentId={student.id}
          classId={student._class.id}
          subject={subject}
        />
      )}
    </div>
  );
};

export default Student;
