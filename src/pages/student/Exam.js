import { useParams } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import SingleExam from "../../features/exams/SingleExam"

const Exam = () => {
  const { examId } = useParams()
  const { class_id } = useAuth()

  return <SingleExam exam_id={examId} class_id={class_id} />
}
export default Exam