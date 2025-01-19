import { useMemo } from "react";
import useAuth from "../../hooks/useAuth";
import { useGetTestsQuery } from "./testsApiSlice";
import { Link } from "react-router-dom";

const TestList = ({ class_id, subject_id }) => {
  const { status } = useAuth();

  // Use current date for filtering
  const currentDate = useMemo(
    () => new Date().toISOString().split("T")[0],
    []
  );

  // Determine filter for API query
  const filter =
    status === "Teacher" ? { class_id, subject_id } : { class_id };

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

  // Filter tests with future due dates
  const filteredTests = useMemo(
    () => tests.filter((test) => test.due_date > currentDate),
    [tests, currentDate]
  );

  let content;

  if (isLoading) {
    content = <p className="text-gray-600">Loading tests...</p>;
  } else if (isError) {
    content = (
      <p className="text-red-600">
        {error?.data?.message || "An error occurred while loading tests."}
      </p>
    );
  } else if (isSuccess) {
    if (filteredTests.length === 0) {
      content = (
        <p className="text-gray-500 italic">
          No upcoming tests available.
        </p>
      );
    } else {
      const listItems = filteredTests.map((test) => (
        <li
          key={test.id}
          className="p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:bg-gray-50"
        >
          <Link
            to={`${test.id}`}
            className="flex justify-between items-center text-blue-600 hover:underline"
          >
            <span className="font-medium text-gray-800">
              {test.subject}
            </span>
            <span className="text-sm text-gray-600">
              Due: {test.due_date}
            </span>
          </Link>
        </li>
      ));

      content = <ul className="space-y-4">{listItems}</ul>;
    }
  }

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Tests</h2>
      {content}
    </div>
  );
};

export default TestList;
