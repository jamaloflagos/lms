import { useMemo } from "react";
import useAuth from "../../hooks/useAuth";
import { useGetExamsQuery } from "./examsApiSlice";
import { Link } from "react-router-dom";

const ExamList = ({ class_id, subject_id }) => {
  const { status, has_made_full_tuition_fee_payment } = useAuth();

  // Use current date for filtering
  const currentDate = useMemo(
    () => new Date().toISOString().split("T")[0],
    []
  );

  // Determine filter for API query
  const filter =
    status === "Teacher" ? { class_id, subject_id } : { class_id };

  const {
    exams = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetExamsQuery(filter, {
    selectFromResult: (result) => ({
      exams: Object.values(result?.data?.entities || {}).map((exam) => ({
        id: exam.id,
        subject: exam.subject,
        due_date: exam.due_date,
      })),
      ...result,
    }),
  });

  // Filter exams to show only those with future due dates
  const filteredExams = useMemo(
    () => exams.filter((exam) => exam.due_date > currentDate),
    [exams, currentDate]
  );

  let content;

  if (isLoading) {
    content = <p className="text-gray-600">Loading exams...</p>;
  } else if (isError) {
    content = (
      <p className="text-red-600">
        {error?.data?.message || "An error occurred while loading exams."}
      </p>
    );
  } else if (isSuccess) {
    if (filteredExams.length === 0) {
      content = (
        <p className="text-gray-500 italic">
          No upcoming exams available.
        </p>
      );
    } else {
      const listItems = filteredExams.map((exam) => (
        <li
          key={exam.id}
          className={`p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 ${!has_made_full_tuition_fee_payment ? "bg-gray-300 cursor-not-allowed" : ""}`}
        >
          <Link
            to={`${exam.id}`}
            className="flex justify-between items-center text-blue-600 hover:underline"
          >
            <span className="font-medium text-gray-800">
              {exam.subject}
            </span>
            <span className="text-sm text-gray-600">
              Due: {exam.due_date}
            </span>
          </Link>
        </li>
      ));

      content = (
        <ul className="space-y-4">
          {listItems}
        </ul>
      );
    }
  }

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Exams</h2>
      {content}
    </div>
  );
};

export default ExamList;
