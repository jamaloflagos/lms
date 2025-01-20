import { useParams } from "react-router-dom"
import SingleGroup from "../../features/groups/SingleGroup"

const Group = () => {
  const { groupId } = useParams()

  return <SingleGroup groupId={groupId} />
}
export default Group