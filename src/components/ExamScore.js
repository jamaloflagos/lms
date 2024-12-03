import { useCustomQuery } from "../hooks/useCustomQuery";
// import { useContext } from "react";
// import { StudentContext } from "../dashboards/Student";

const ExamScore = ({ studentId, subject }) => {
  // const { studentId } = useContext(StudentContext);

  const {
    data: exam_score,
    isLoading,
    isError,
    error,
  } = useCustomQuery(
    ["exam_score", subject, studentId],
    `https://lms-api-xi.vercel.app/score?score_type=Exam&student_id=${studentId}&subject=${subject}`
  );

  if (isLoading) return <div>Loading data...</div>;
  if (isError) return <div>{error.message}</div>;
  return (
    <div>
      {exam_score.value ? (
        <span>{exam_score.value}</span>
      ) : (
        <p>No exam score yer</p>
      )}
    </div>
  );
};
export default ExamScore;
