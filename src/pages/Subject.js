import { useParams } from "react-router-dom";
import { useCustomQuery } from "../hooks/useCustomQuery";
import LessonForm from "../components/LessonForm";
import { useState } from "react";

const Subject = () => {
  const { subject, teacherId } = useParams();
  const classSet = localStorage.getItem("classSet");
  const classes = [...JSON.parse(classSet)];
  const {
    data: lessons,
    isLoading,
    isError,
  } = useCustomQuery(
    ["lessons", subject],
    `https://lms-api-xi.vercel.app/lessons?subject=${subject}&teacher_id=${teacherId}`
  );
  const [addLesson, setAddLesson] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;
  return (
    <div>
      <div>
        {lessons.length > 0 ? (
          <>
            {classes &&
              classes.map((_class) => (
                <div key={_class}>
                  <h5>{_class}</h5>
                  <hr />
                  <ul>
                    {lessons
                      .filter((lesson) => lesson.class_details.name === _class)
                      .map((filteredLesson) => (
                        <li key={filteredLesson.id}>{filteredLesson.topic}</li>
                      ))}
                  </ul>
                </div>
              ))}
          </>
        ) : (
          <p>No lessons have been created for this subject</p>
        )}
      </div>
      <div>
        <button onClick={() => setAddLesson((prev) => !prev)}>
          Create Lesson
        </button>
      </div>
      {addLesson && <LessonForm teacherId={teacherId} />}
    </div>
  );
};
export default Subject;
