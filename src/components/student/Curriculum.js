import { Link } from "react-router-dom";
import { useCustomQuery } from "../../hooks/useCustomQuery";
import { useStudent } from "../../hooks/useStudent";

const Curriculum = () => {
  const { studentDetail } = useStudent();
  console.log(studentDetail)
  const {
    data: courses,
    isLoading,
    isError,
    error,
  } = useCustomQuery(
    ["courses", studentDetail.class_details.id],
    `http://127.0.0.1:8000/class/${studentDetail.class_details.id}/courses`
  );

  console.log(courses)
  if (isLoading) return <div>Loading data...</div>;
  if (isError) return <div>Error fetching data due to {error.message}</div>;
  return (
    <div>
      <div>
        <h3>Curriculum</h3>
        <p>Overview of your courses and syllabus</p>
      </div>
      <div>
        {
          courses.length > 0 ? (
            courses.map((course) => (
              <Link key={course.id} to={`${course.title}/${course.id}`}>
                <div>
                  <div>
                    <picture>{course.picture}</picture>
                    <span>{course.status}</span>
                  </div>
                  <div>
                    <h4>{course.name}</h4>
                    <h6>{course.creator}</h6>
                  </div>
                  <div>
                    <div>
                      <span>Logo</span>
                      {/* <span>{course.modules.count} Modules</span> */}
                    </div>
                    <div></div>
                  </div>
                </div>
              </Link>
            ))
          ) : <p>You have no courses uploaded for you yet!</p>
        }
      </div>
    </div>
  );
};
export default Curriculum;
