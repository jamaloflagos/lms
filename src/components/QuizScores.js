import { useCustomQuery } from "../hooks/useCustomQuery";

const QuizScores = ({subject, studentId}) => {
    const { data: quiz_scores, isLoading, isError, error } = useCustomQuery(["quiz_scores", subject, studentId], `http://127.0.0.1:8000/scores?score_type=Quiz&student_id=${studentId}&subject=${subject}`);

  if (isLoading) return <div>Loading data...</div>;
  if (isError) return <div>{error.message}</div>;
  return (
    <div>
      { quiz_scores.length > 0 ? (
            quiz_scores.map(score => (
                <span>{score.lesson}: {score.value}</span>
            ))
        ) : <span>No score yet!</span>
      }
    </div>
  );
};
export default QuizScores;
