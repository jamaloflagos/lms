import useAuth from "../../hooks/useAuth";
import { useGetScoresQuery } from "./scoresApiSlice";

const Scores = ({ subjectId: subject_id }) => {
  const { user_id: student_id } = useAuth();

  const {
    data: scores = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetScoresQuery({ student_id, subject_id });

  let content;

  if (isLoading) {
    content = <p className="text-gray-600">Loading your scores...</p>;
  } else if (isError) {
    content = (
      <p className="text-red-600">
        {error?.data?.message || "An error occurred while loading scores."}
      </p>
    );
  } else if (isSuccess) {
    if (scores.length === 0) {
      content = (
        <p className="text-gray-500 italic">
          No scores available for this subject.
        </p>
      );
    } else {
      const listItems = scores.map((score) => (
        <li
          key={score.id}
          className="p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:bg-gray-50"
        >
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-800">
              {score.score_type}
            </span>
            <span
              className={`${
                score.value === 0
                  ? "text-red-600 font-bold"
                  : "text-gray-600"
              }`}
            >
              {score.value}
            </span>
          </div>
        </li>
      ));

      content = <ul className="space-y-4">{listItems}</ul>;
    }
  }

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Scores</h2>
      {content}
    </div>
  );
};

export default Scores;
