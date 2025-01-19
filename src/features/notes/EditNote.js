import EditNoteForm from "./EditNoteForm";
import { useGetNotesQuery } from "./notesApiSlice";

export const EditNote = ({ noteId, outlineId }) => { 
  const { note } = useGetNotesQuery(outlineId, {
    selectFromResult: ({ data }) => ({
      note: data?.entities[noteId],
    }),
  });

  return <EditNoteForm note={note} />;
};

