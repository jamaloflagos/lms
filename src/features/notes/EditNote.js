import { useParams } from "react-router-dom";
import EditNoteForm from "./EditNoteForm";
import { useGetNotesQuery } from "./notesApiSlice";

const EditNote = () => { 
  const { noteId, outlineId } = useParams(); 
  const { note } = useGetNotesQuery(outlineId, {
    selectFromResult: ({ data }) => ({
      note: data?.entities[noteId],
    }),
  });

  return <EditNoteForm note={note} />;
};
export default EditNote;
