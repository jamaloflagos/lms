import { useParams } from "react-router-dom"
import { EditGroup as EditAGroup } from "../../features/groups/EditGroup"
const EditGroup = () => {
  const { groupId } = useParams()

  return <EditAGroup groupId={groupId} />
}
export default EditGroup