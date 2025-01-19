import { useState, useEffect } from "react";
import { useGetTeachersQuery } from "./teachersApiSlice";
import { Link } from "react-router-dom";

const TeachersList = () => {
  const {
    teachers = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTeachersQuery("teachersList", {
    selectFromResult: (result) => {
      const teachers = Object.values(result?.data?.entities || {}).map(
        (teacher) => ({
          id: teacher.id,
          first_name: teacher.first_name,
          last_name: teacher.last_name,
          is_form_teacher: teacher.is_form_teacher,
        })
      );

      return {
        ...result,
        teachers,
      };
    },
  });

  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  // Initialize filteredTeachers once when teachers data changes
  useEffect(() => {
    if (filteredTeachers.length === 0 && teachers.length > 0) {
      setFilteredTeachers(teachers);
    }
  }, [teachers, filteredTeachers]);

  const onFilterValueChange = (e) => {
    const value = e.target.value;
    setFilterValue(value);

    if (value === "") {
      setFilteredTeachers(teachers);
    } else {
      const isFormTeacher = value === "true";
      setFilteredTeachers(
        teachers.filter((teacher) => teacher.is_form_teacher === isFormTeacher)
      );
    }
  };

  const clearFilter = () => {
    setFilterValue("");
    setFilteredTeachers(teachers);
  };

  let content;

  if (isLoading) {
    content = <p className="text-center text-gray-500">Loading...</p>;
  }

  if (isError) {
    content = <p className="text-center text-red-500">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const listItems = filteredTeachers.map((teacher) => (
      <li
        key={teacher.id}
        className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center hover:shadow-lg transition-shadow duration-200"
      >
        <div>
          <h3 className="text-lg font-semibold text-blue-600">
            {teacher.first_name} {teacher.last_name}
          </h3>
          <p className="text-sm text-gray-500">
            {teacher.is_form_teacher ? "Form Teacher" : "Not a Form Teacher"}
          </p>
        </div>
        <Link
          to={`${teacher.id}`}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          View Details
        </Link>
      </li>
    ));

    content = (
      <section className="p-6 bg-gray-50 rounded-lg shadow-inner">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-blue-700">All Teachers</h1>
          <p className="text-gray-600">
            Browse through all teachers and filter them based on their roles.
          </p>
        </header>

        {/* Filter Controls */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <label htmlFor="filter" className="font-medium text-gray-700">
              Filter by:
            </label>
            <select
              value={filterValue}
              id="filter"
              onChange={onFilterValueChange}
              className="p-2 border rounded-md text-gray-700"
            >
              <option value="">All</option>
              <option value="true">Form Teacher</option>
              <option value="false">Not Form Teacher</option>
            </select>
          </div>
          <button
            onClick={clearFilter}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Clear Filter
          </button>
        </div>

        {/* Teachers List */}
        <ul className="space-y-4">{listItems}</ul>
      </section>
    );
  }

  return content;
};

export default TeachersList;
