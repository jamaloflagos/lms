import LessonList from "./LessonList";
import ExamScore from "./ExamScore";
import QuizScores from "./QuizScores";

const Subject = ({ subject, studentId, classId }) => {
  console.log(`subject: ${subject}`);

  return (
    <div>
      <LessonList subject={subject} classId={classId} />
      <QuizScores subject={subject} studentId={studentId} />
      <ExamScore subject={subject} studentId={studentId} />
    </div>
  );
};
export default Subject;
