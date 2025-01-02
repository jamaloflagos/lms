import { Link, useParams } from "react-router-dom";
import { useGetCoursesQuery } from "./coursesApiSlice"
import { memo } from "react";
import ModulesList from "../modules/ModulesList";
import useAuth from "../../hooks/useAuth";

const Course = ({ courseId }) => {
    const { course } = useGetCoursesQuery('coursesList', {
        selectFromResult: ({ data }) => ({
            course: data?.entities[courseId]
        })
    });

    const { isTeacher } = useAuth()
    const { id: courseIdRouteParam } = useParams();

    let content;
    if (course) {
        if (courseIdRouteParam) {
            content = (
                <article>
                    <div>
                        {isTeacher && <Link>Edit</Link>}
                    </div>
                    <section>
                        <div>
                            <h1>{course.title}</h1>
                            <h2>{course.description}</h2>
                        </div>
                        <ModulesList />
                    </section>
                    <section></section>
                </article>
            )
        } else {
            content = (
                <div>
                    <img src={course.image} alt="course_image" />
                    <div>
                        <h1>{course.title}</h1>
                        <h2>{course.creator}</h2>
                    </div>
                    <div>{course.status}</div>
                </div>
            )
        }
    } else content = null

  return content
}

const memoizedCourse = memo(Course)
export default memoizedCourse