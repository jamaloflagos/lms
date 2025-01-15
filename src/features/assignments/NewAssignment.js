import { useEffect, useState } from "react";
import { useAddNewAssignmentMutation } from "./assignmentsApiSlice";
import QuestionForm from "../../components/QuestionForm";
import { useNavigate } from "react-router-dom";

export const NewAssignment = ({ class_id, subject_id }) => {
    const navigate = useNavigate()
    const [timeAllowed, setTimeAllowed] = useState('')
    const [questions, setQuestions] = useState([
        { question: '', options: ['', '', '', ''], answer: null }, 
      ]);  
    const [dueDate, setDueDate] = useState('')
    const [addNewAssignment, {isLoading, isSuccess, isError, error}] = useAddNewAssignmentMutation()

    const canSave = [questions.length > 0, dueDate, class_id, subject_id, timeAllowed].every(Boolean) && !isLoading

    const onSubmit = async (e) => {
        e.preventDefault()

        if (canSave) {
            addNewAssignment({ questions, dueDate, class_id, subject_id, time_allowed: timeAllowed})
        }
    }

    useEffect(() => {
        if (isSuccess) {
            setDueDate('')
            setQuestions('')
            navigate('assignments')
        }
    }, [isSuccess, navigate])

    const content = (
        <article>
            <header>
                <h1>New Assignment</h1>
            </header>
            <form onSubmit={onSubmit}>
                {isError && <p>{error?.data?.message}</p>}
                <QuestionForm />
                <label htmlFor="due_date">Due date:
                    <input type="date" id="due_date" value={dueDate} onChange={(e) => setDueDate(e.target.valueAsDate)} />
                </label>
                <label htmlFor="due_date">Time Allowed (IN MINUTES):
                    <input type="number" id="due_date" value={timeAllowed} onChange={(e) => setTimeAllowed(e.target.valueAsNumber)} />
                </label>
                <button>Save</button>
            </form>
        </article>
    )

  return content
}
