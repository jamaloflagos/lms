import { useParams } from "react-router-dom"
import { useGetOutlinesQuery } from "./subjectsApiSlice"
import EditOutlineForm from "./EditOutlineForm"

const EditOutline = () => {
    const { id: outlineId } = useParams()
    const { outline } = useGetOutlinesQuery('outlinesList', {
        selectFromResult: ({ data }) => ({
            outline: data?.entities[outlineId]
        })
    })


  return <EditOutlineForm outline={outline} />
}
export default EditOutline