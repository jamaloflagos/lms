import { useParams } from "react-router-dom";
import SingleOutline from "../../features/outlines/SingleOutline"

export const Outline = () => {
  const { outlineId, classId, subjectId } = useParams(); 

  return <SingleOutline outlineId={outlineId} classId={classId} subjectId={subjectId} />
}
