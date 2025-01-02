import { Link, useParams } from "react-router-dom";
import { useGetLessonsQuery } from "./lessonsApiSlice";
import Questions from "../../components/Questions";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const Lesson = () => {
  const { id: lessonId } = useParams();
  const { isTeacher } = useAuth();

  const { lesson } = useGetLessonsQuery("lessonsList", {
    selectFromResult: ({ data }) => ({
      lesson: data?.entities[lessonId],
    }),
  });
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(lesson.assignment_questions.length).fill(null)
  );

  const handleAnswersSubmit = async () => {};

  let content;

  if (lesson) {
    content = (
      <article>
        <div>
          <h1>{lesson.title}</h1>
          {isTeacher && <Link>Edit</Link>}
        </div>
        <section>
          <p>{lesson.note}</p>
        </section>
        <section>{/* video */}</section>
        <section>
          {lesson.has_assignment && (
            <Questions
              questions={lesson.assignment_questions}
              setSelectedAnswers={setSelectedAnswers}
              selectedAnswers={selectedAnswers}
              handleAnswersSubmit={handleAnswersSubmit}
            />
          )}
        </section>
      </article>
    );
  } else {
    content = null;
  }
  return content;
};
export default Lesson;
