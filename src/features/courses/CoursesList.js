import { useGetCoursesQuery } from "./coursesApiSlice"
import Course from "./Course"
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const CoursesList = () => {
    const { isStudent, isTeacher } = useAuth()
    const { data: courses, isLoading, isSuccess, isError, error } = useGetCoursesQuery('coursesList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
      });
    const [filterValue, setFilterValue] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredIds, setFilteredIds] = useState([])

    let content;

    if (isLoading) content = <p>Loading...</p>

    if (isError) content = <p>{error?.data?.message}</p>

    if (isSuccess) {
        const { ids, entities } = courses
        if (isTeacher) {
            if (filterValue) {
                setFilteredIds(ids.filter(
                    (courseId) => entities[courseId].status === filterValue
                ))
            } else if (searchTerm) {
                setFilteredIds(ids.filter(
                    (courseId) => entities[courseId].status === searchTerm
                ))
            } else {
                setFilteredIds([...ids])
            }
        } else if (isStudent) {
            if (searchTerm) {
                setFilteredIds(ids.filter(
                    (courseId) => entities[courseId].status === searchTerm
                ))
            } else {
                setFilteredIds(ids.filter(
                    (courseId) => entities[courseId].status === 'Open'
                ))
            }
        }
        const courseCards = filteredIds.map(course => (
            <Course courseId={course.id} />
        ))

        content = (
            <div>
                <label htmlFor="search">
                    <input type="text" id="search" placeholder="Search by Course Title" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                </label>

                {courseCards}

                { isTeacher && (
                    <label htmlFor="filter">
                        <select id="filter" value={filterValue} onChange={(e) => setFilterValue(e.target.value)}>
                            <option value="">Filter</option>
                            <option value="Open">Open</option>
                            <option value="Waitlisted">Waitlisted</option>
                        </select>
                    </label>
                )}
            </div>
        )
    }

  return content
}
export default CoursesList