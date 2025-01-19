import { useGetOutlinesQuery } from "./outlinesApiSlice";
import EditOutlineForm from "./EditOutlineForm";

export const EditOutline = ({ outlineId, classId, subjectId }) => {
  const { outline } = useGetOutlinesQuery({ class_id: classId, subject_id: subjectId}, {
    selectFromResult: ({ data }) => ({
      outline: data?.entities[outlineId],
    }),
  });

  return <EditOutlineForm outline={outline} class_id={classId} subject_id={subjectId} />;
};

