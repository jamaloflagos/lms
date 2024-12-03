import { useCustomQuery } from "../hooks/useCustomQuery";
import { useParams } from "react-router-dom";
import Questions from "../components/Questions";
import { useAuth } from "../hooks/useAuth";

const Lesson = () => {
  const { lessonId } = useParams();
  const { userId: studentId } = useAuth();
  const LessonQuery = useCustomQuery(
    ["lesson", lessonId],
    `https://lms-api-xi.vercel.app/lessons/${lessonId}`
  );
  const ScoreQuery = useCustomQuery(
    ["score", lessonId, studentId],
    `https://lms-api-xi.vercel.app/score?lesson_id=${lessonId}&student_id=${studentId}&score_type=Quiz`
  );

  if (LessonQuery.isLoading || ScoreQuery.isLoading)
    return <div>Loading data...</div>;
  if (LessonQuery.error || ScoreQuery.error)
    return <div>Error fetching data</div>;

  const lesson = LessonQuery.data;
  const score = ScoreQuery.data;
  console.log(lesson, score);
  return (
    <div>
      <h1>Subject: {lesson.subject}</h1>
      <h1>Topic: {lesson.topic}</h1>
      <h1>Content: {lesson.content}</h1>
      {!score.value ? (
        <Questions
          questions={lesson.quiz}
          context={"lesson_exam"}
          subjectName={lesson.subject}
          studentId={studentId}
          lessonId={lesson.id}
          url={"https://lms-api-xi.vercel.app/scores"}
          scoreType={"Quiz"}
        />
      ) : (
        <span>Quiz score: {score.value}</span>
      )}
    </div>
  );
};
export default Lesson;
