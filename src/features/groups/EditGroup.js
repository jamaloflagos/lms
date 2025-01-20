import useAuth from "../../hooks/useAuth"
import EditGroupForm from "./EditGroupForm"
import { useGetGroupsQuery } from "./groupsApiSlice"

export const EditGroup = ({ groupId }) => {
  const { user_id: studentId } = useAuth() 
  const { group } = useGetGroupsQuery(studentId, {
    selectFromResult: ({ data }) => ({
      group: data?.entities[groupId]
    })
  })

  
  return <EditGroupForm group={group} />
}