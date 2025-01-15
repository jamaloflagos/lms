import { useParams } from "react-router-dom"
import NewNoteForm from "./NewNoteForm"

const NewNote = () => {
    const { outlineId } = useParams()

  return <NewNoteForm outlineId={outlineId} />
}
export default NewNote