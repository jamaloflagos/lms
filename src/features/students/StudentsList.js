import { Link } from "react-router-dom";
import { useGetStudentsQuery } from "./studentsApiSlice";

const StudentsList = ({ classId }) => {
  console.log(classId)
  const {
    students = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetStudentsQuery(classId, {
    selectFromResult: (result) => {
      const students = Object.values(result?.data?.entities || {}).map(student => ({
        name: `${student.first_name} ${student.last_name}`,
        id: student.id
      }));

      return {
        ...result,
        students,
      };
    },
  });
  console.log(students)

  let content;
  if (isLoading) content = <p>Loading...</p>;

  if (isError) content = <p>{error?.data?.message}</p>;

  if (isSuccess) {
    const listItems = students.map((student) => (
      <li key={student.id}>
        <Link to={`${student.id}`}>
          <span>
            {student.name} ({student.category})
          </span>
          <span>{student.students}</span>
        </Link>
      </li>
    ));

    content = <ul>{listItems}</ul>;
  }

  return content;
};
export default StudentsList;
