import { useParams } from "react-router-dom"
import AddOutline from "../../features/outlines/NewOutline"

const NewOutline = () => {
  const { classId, subjectId } = useParams()
  return (
    <article>
      <AddOutline classId={classId} subjectId={subjectId} />
    </article>
  )
}
export default NewOutline