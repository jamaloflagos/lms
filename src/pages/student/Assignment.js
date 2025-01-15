import { useParams } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import SingleAssignment from "../../features/assignments/SingleAssignment"

const Assignment = () => {
  const { assignmentId } = useParams()
  const { class_id } = useAuth()

  return <SingleAssignment id={assignmentId} class_id={class_id} />

}

export default Assignment