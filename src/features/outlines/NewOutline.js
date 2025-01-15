import { useParams } from "react-router-dom"
import NewOutlineForm from "./NewOutlineForm"

const NewOutline = () => {
    const { classId, subjectId } = useParams()
    const formattedSubjectId = subjectId.split("_")[1]

  return <NewOutlineForm classId={classId} subjectId={formattedSubjectId} />
}
export default NewOutline