import { NewExam as AddNewExam } from "../../features/exams/NewExam"
import { useParams } from "react-router-dom"

const NewExam = () => {
  const { subjectId, classId } = useParams()

  return <AddNewExam subject_id={subjectId} class_id={classId} />
}
export default NewExam