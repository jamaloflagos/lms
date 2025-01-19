import { useParams } from "react-router-dom";
import { EditOutline as Edit } from "../../features/outlines/EditOutline"
const EditOutline = () => {
    const { outlineId, subjectId, classId } = useParams();
  return (
    <>
      <Edit outlineId={outlineId} classId={classId} subjectId={subjectId} />
    </>
  )
}
export default EditOutline