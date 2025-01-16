import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useGetTestsQuery } from "./testsApiSlice";
import { Link } from "react-router-dom";

const TestList = ({ class_id, subject_id }) => {
  const currentDate = "";
  const { status } = useAuth();
  const [filteredTests, setFilteredTests] = useState([]);
  const filter = status === "Teacher" ? { class_id, subject_id } : { class_id };
  const {
    tests = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTestsQuery(filter, {
    selectFromResult: (result) => ({
      tests: Object.values(result?.data?.entities || {}).map((test) => ({
        id: test.id,
        subject: test.subject,
        due_date: test.due_date,
      })),
      ...result,
    }),
  });

  useEffect(() => {
    if (tests.length > 0) {
      setFilteredTests(tests.filter((test) => test.due_date > currentDate));
    }
  }, [tests, isSuccess]);

  let content;

  if (isLoading) content = <p>Loading...</p>;
  if (isError) content = <p>{error?.data?.message}</p>;
  if (isSuccess) {
    const listItems = filteredTests.map((test) => (
      <li>
        <Link to={`${test.id}`}>
          <span>{test.subject}</span>
          <span>{test.due_date}</span>
        </Link>
      </li>
    ));

    content = <ul>{listItems}</ul>;
  }

  return content;
};
export default TestList;
