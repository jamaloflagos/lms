import { useGetClassesQuery } from "./classesApiSlice"
import EditClassForm from "./EditClassForm"

export const EditClass = ({ id }) => {
    const { classData } = useGetClassesQuery('classesList', {
        selectFromResult: ({ data }) => ({
            classData: data?.entities[id]
        })
    })
    
  return <EditClassForm classData={classData} />
}
