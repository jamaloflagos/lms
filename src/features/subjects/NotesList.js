import { Link } from "react-router-dom"
import { useGetNotesQuery } from "./subjectsApiSlice"

const NotesList = ({ outlineId }) => {
    const { notes, isLoading, isSuccess, isError, error } = useGetNotesQuery(outlineId, {
        selectFromResult: (result) => {
            const notes = Object.values(result?.data?.entities).map(note => ({
                title: note.title
            }))

            return {
                notes,
                ...result
            }
        }
    })

    let content;
    if (isLoading) content = <p>Loading...</p>
    if (isError) content = <p>{error?.data?.message}</p>
    if (isSuccess) {
        const listItems = notes.map(note => (
            <li>
                <Link to={''}>{note.title}</Link>
            </li>
        ))
        content = (
            <ul>
                {listItems}
            </ul>
        )
    }
  return content
}
export default NotesList