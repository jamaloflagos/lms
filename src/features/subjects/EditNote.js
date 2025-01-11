import { useParams } from "react-router-dom"
import { useGetNotesQuery } from "./subjectsApiSlice"
import EditNoteForm from "./EditNoteForm"

const EditNote = () => {
    const { id: noteId, outlineId } = useParams()
    const { note } = useGetNotesQuery(outlineId, {
        selectFromResult: ({ data }) => ({
            note: data?.entities[noteId]
        })
    })

  return <EditNoteForm note={note} />
}
export default EditNote