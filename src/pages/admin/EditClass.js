import { useParams } from "react-router-dom"
import { EditClass as EditAClass } from "../../features/classes/EditClass"
const EditClass = () => {
  const { id } = useParams() 
  return (
    <article>
      <EditAClass id={id} />
    </article>
  )
}
export default EditClass