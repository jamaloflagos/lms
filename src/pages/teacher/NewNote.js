import { useParams } from "react-router-dom"
import AddNote from "../../features/notes/NewNote"

const NewNote = () => {
  const { outlineId } = useParams()
  return (
    <article>
      <AddNote outlineId={outlineId} />
    </article>
  )
}
export default NewNote