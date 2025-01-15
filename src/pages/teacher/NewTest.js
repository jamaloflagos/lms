import { useParams } from "react-router-dom"
import { NewTest as AddNewTest } from "../../features/tests/NewTest"
const NewTest = () => {
  const { subjectId, classId } = useParams()

  return <AddNewTest subject_id={subjectId} class_id={classId} />
}
export default NewTest