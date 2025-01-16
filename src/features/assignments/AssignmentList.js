import { useEffect, useState } from "react"
import useAuth from "../../hooks/useAuth"
import { useGetAssignmentsQuery } from "./assignmentsApiSlice"
import { Link } from "react-router-dom"

const AssignmentList = ({ class_id, subject_id }) => {
    const currentDate = ''
    const { status } = useAuth()
    const [filteredAssignments, setFilteredAssignments] = useState([])
    const filter = status === "Teacher" ? { class_id, subject_id } : { class_id }
    const { assignments = [], isLoading, isSuccess, isError, error } = useGetAssignmentsQuery(filter, {
        selectFromResult: (result) => ({
            assignments: Object.values(result?.data?.entities || {}).map(assignment => ({
                id: assignment.id,
                subject: assignment.subject,
                due_date: assignment.due_date
            })),
            ...result
        })
    })

    useEffect(() => {
        if (assignments.length > 0) {
            setFilteredAssignments(assignments.filter(assignment => assignment.due_date > currentDate))
        }
    }, [assignments, isSuccess])

    let content;

    if (isLoading) content = <p>Loading...</p>
    if (isError) content = <p>{error?.data?.message}</p>
    if (isSuccess) {
        const listItems = filteredAssignments.map(assignment => (
            <li>
                <Link to={`${assignment.id}`}>
                <span>{assignment.subject}</span>
                <span>{assignment.due_date}</span>
                </Link>
            </li>
        ))

        content = (
            <ul>
                {listItems}
            </ul>
        )
    }
    
  return content
}
export default AssignmentList