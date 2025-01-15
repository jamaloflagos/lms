import { useParams } from "react-router-dom"
import { NewAssignment as AddNewAssignment } from "../../features/assignments/NewAssignment"
const NewAssignment = () => {
  const {subjectId, classId } = useParams()

  return <AddNewAssignment subject_id={subjectId} class_id={classId} />
}
export default NewAssignment