import { useParams } from "react-router-dom";
import { EditNote as Edit } from "../../features/notes/EditNote"
const EditNote = () => {
    const { noteId, outlineId } = useParams();
  
  return (
    <>
    <Edit noteId={noteId} outlineId={outlineId} />
    </>
  )
}
export default EditNote