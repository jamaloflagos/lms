import { Link } from "react-router-dom";
import { useGetStudentsQuery } from "./studentsApiSlice";

const StudentsList = ({ classId }) => {
  const {
    students = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetStudentsQuery(classId, {
    selectFromResult: (result) => {
      const students = Object.values(result?.data?.entities || {}).map((student) => ({
        name: `${student.first_name} ${student.last_name}`,
        id: student.id,
        email: student.email, // Assuming you have additional details like email
      }));

      return {
        ...result,
        students,
      };
    },
  });

  let content;

  if (isLoading) {
    content = <p className="text-center text-gray-500">Loading students...</p>;
  }

  if (isError) {
    content = <p className="text-center text-red-500">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const listItems = students.map((student) => (
      <li
        key={student.id}
        className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center hover:shadow-lg transition-shadow duration-200"
      >
        {/* Student Name and Details */}
        <div>
          <h3 className="text-lg font-semibold text-blue-600">{student.name}</h3>
          <p className="text-sm text-gray-500">{student.email}</p>
        </div>

        {/* View More Button */}
        <Link
          to={`${student.id}`}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          View Profile
        </Link>
      </li>
    ));

    content = (
      <ul className="space-y-4">
        {listItems}
      </ul>
    );
  }

  return (
    <section className="p-4 bg-gray-50 rounded-lg shadow-inner">
      {/* <h2 className="text-xl font-bold mb-4 text-blue-600">Student List</h2> */}
      {content}
    </section>
  );
};

export default StudentsList;
