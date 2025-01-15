import { useEffect, useState } from "react"
import useAuth from "../../hooks/useAuth"
import { useGetExamsQuery } from "./examsApiSlice"

const ExamList = ({ class_id, subject_id }) => {
    const currentDate = ''
    const { status } = useAuth()
    const [filteredExams, setFilteredExams] = useState([])
    const filter = status === "Teacher" ? { class_id, subject_id } : { class_id }
    const { exams = [], isLoading, isSuccess, isError, error } = useGetExamsQuery(filter, {
        selectFromResult: (result) => ({
            exams: Object.values(result?.data?.entities || {}).map(exam => ({
                id: exam.id,
                subject: exam.subject,
                due_date: exam.due_date
            })),
            ...result
        })
    })

    useEffect(() => {
        if (exams.length > 0) {
            setFilteredExams(exams.filter(exam => exam.due_date > currentDate))
        }
    }, [exams, isSuccess])

    let content;

    if (isLoading) content = <p>Loading...</p>
    if (isError) content = <p>{error?.data?.message}</p>
    if (isSuccess) {
        const listItems = filteredExams.map(exam => (
            <li>
                <span>{exam.subject}</span>
                <span>{exam.due_date}</span>
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
export default ExamList