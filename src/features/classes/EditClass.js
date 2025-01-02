import { useParams } from "react-router-dom"
import { useGetClassesQuery } from "./classesApiSlice"
import EditClassForm from "./EditClassForm"

const EditClass = () => {
    const { id } = useParams() 
    const { classData } = useGetClassesQuery('classesList', {
        selectFromResult: ({ data }) => ({
            classData: data?.entities[id]
        })
    })
    
  return <EditClassForm classData={classData} />
}
export default EditClass