import { useParams } from "react-router-dom";
import { useCustomQuery } from "../../hooks/useCustomQuery";
import { useStudent } from "../../hooks/useStudent";
import LessonList from "./LessonList";
import { useState } from "react";

const Course = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const { courseId } = useParams();
  const { studentDetail } = useStudent();
  const { class_details } = studentDetail;
  console.log(studentDetail)
  const {
    data: course_detail,
    isLoading: courseIsLoading,
    isError: courseIsError,
    error: courseError,
  } = useCustomQuery(
    ["course", courseId],
    `http://127.0.0.1:8000/course/${courseId}`
  );
  const {
    data: modules,
    isLoading: moduleIsLoading,
    isError: moduleIsError,
    error: moduleError,
  } = useCustomQuery(
    ["course", courseId, class_details.id],
    `http://127.0.0.1:8000/class/${class_details.id}/courses/${courseId}/modules`
  );

  if (courseIsLoading || moduleIsLoading) return <div>Fetching data...</div>;
  if (courseIsError || moduleIsError)
    return (
      <div>
        Error fetching data due to: $
        {courseError.message || moduleError.message}
      </div>
    );
  return (
    <div>
      <div>
        <h3>{course_detail.title}</h3>
        <h3>{course_detail.description}</h3>
      </div>
      <div>
        {
          modules.length > 0 ? (
            modules.map((module, index) => (
              <div>
                <div onClick={() => toggleAccordion(index)}>
                  <span>{module.title}</span>
                </div>
                <div
                  className={`accordion-content ${
                    activeIndex === index ? "show" : ""
                  }`}
                >
                  <LessonList
                    moduleId={module.id}
                    classId={class_details.id}
                    courseId={courseId}
                  />
                </div>
              </div>
            ))
          ) : <p>No modules for this course yet</p>
        }
      </div>
    </div>
  );
};
export default Course;
