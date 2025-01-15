import useAuth from "../../hooks/useAuth"
import { useGetScoresQuery } from "./scoresApiSlice"

const Scores = ({ subjectId: subject_id }) => {
    const { user_id: student_id } = useAuth()
    const { scores, isLoading, isSuccess, isError, error } = useGetScoresQuery({ student_id, subject_id});

    let content;
    if (isLoading) content = <p>Loading your scores...</p>
    if (isError) content = <p>{error?.data?.message}</p>
    if (isSuccess) {
        const listItems = scores.map(score => (
            <li>
                <p>{score.score_type}: {score.value}</p>
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
export default Scores