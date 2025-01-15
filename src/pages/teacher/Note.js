import { useParams } from "react-router-dom";
import SingleNote from "../../features/notes/SingleNote"

export const Note = () => {
  const { noteId, outlineId } = useParams(); 

  return <SingleNote noteId={noteId} outlineId={outlineId} />
}
