import { useParams } from "react-router-dom"
import NewOutlineForm from "./NewOutlineForm"

const NewOutline = () => {
    const { classId, subjectId } = useParams()

  return <NewOutlineForm classId={classId} subjectId={subjectId} />
}
export default NewOutline