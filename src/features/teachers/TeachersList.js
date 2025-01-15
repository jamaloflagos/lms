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

  useEffect(() => {
    if (filteredTeachers.length === 0 && teachers.length > 0) {
      setFilteredTeachers(teachers);
    }
  }, [teachers, filteredTeachers]);

  const onFilterValueChange = (e) => {
    const value = e.target.value;
    console.log(value);
    setFilterValue(value);

    if (value === "") {
      setFilteredTeachers(teachers);
    } else {
      setFilteredTeachers(
        teachers.filter(
          (teacher) => teacher.is_form_teacher === (value === "true")
        )
      );
    }
  };

  const clearFilter = () => {
    setFilterValue("");
    setFilteredTeachers(teachers);
  };

  let content;

  if (isLoading) content = <p>Loading....</p>;

  if (isError) content = <p>{error?.data?.message}</p>;

  if (isSuccess) {
    const listItems = filteredTeachers.map((teacher) => (
      <li key={teacher.id}>
        <Link to={`${teacher.id}`}>
          {teacher.first_name} {teacher.last_name}
        </Link>
      </li>
    ));

    content = (
      <section>
        <header>
          <h1>Teachers</h1>
          <Link to="new">Add New Teacher</Link>
        </header>
        <div>
          <label htmlFor="filter">
            <select
              value={filterValue}
              id="filter"
              onChange={onFilterValueChange}
            >
              <option value="">All</option>
              <option value="true">Form Teacher</option>
              <option value="false">Not Form Teacher</option>
            </select>
          </label>
          <button onClick={clearFilter}>Clear filter</button>
        </div>
        <ul>{listItems}</ul>
      </section>
    );
  }

  return content;
};
export default TeachersList;
