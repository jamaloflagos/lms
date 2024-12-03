import { Link } from "react-router-dom";
import { useCustomQuery } from "../hooks/useCustomQuery";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const StudentList = ({ classId, context }) => {
  const {
    data: students,
    isLoading,
    isError,
    error,
  } = useCustomQuery(
    ["students", classId],
    `https://lms-api-xi.vercel.app/students?class_id=${classId}`
  );
  const [selectedOption, setSelectedOption] = useState("");
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const mutation = useMutation({
    mutationFn: async (newAtendance) => {
      const response = await fetch(
        "https://lms-api-xi.vercel.app/attendances/",
        {
          // Replace with your actual endpoint
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAtendance),
        }
      );
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error(
            "You have already marked an attendance for this student today"
          );
        }
        throw new Error("Error marking student attendance");
      }
      return response.json();
    },
    onSuccess: (data) => {
      setSelectedOption("");
      alert("You have successfully marked student attendance");
    },

    onError: (error) => {
      alert(error.message);
    },
  });

  const handleMarkAttendance = (e, id) => {
    e.preventDefault();
    if (!selectedOption) {
      return alert(
        "Select the attendance status for this student before submitting"
      );
    }

    const newAttendance = {
      student: id,
      status: selectedOption,
      _class: classId,
      date_marked: formattedDate,
    };

    mutation.mutate(newAttendance);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching students due to {error.message}</div>;
  return (
    <div>
      {context && context === "attendances" ? (
        <div>
          <p>Attendance for: {formattedDate}</p>
          {students.map((student) => (
            <div key={student.id}>
              <span>
                {student.first_name} {student.last_name}
              </span>
              <Link to={`/attendances/student/${student.id}`}>
                View Attendancs
              </Link>
              <select
                name=""
                id=""
                onClick={(e) => setSelectedOption(e.target.value)}
              >
                <option value="">Select an option</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>
              <button onClick={(e) => handleMarkAttendance(e, student.id)}>
                Mark Attendance
              </button>
            </div>
          ))}
        </div>
      ) : (
        students.map((student) => (
          <div>
            <Link to={`/student/${student.first_name} ${student.last_name}`}>
              {student.first_name} {student.last_name}
            </Link>
          </div>
        ))
      )}
    </div>
  );
};
export default StudentList;
