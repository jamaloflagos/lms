import { useParams } from "react-router-dom"
import SingleClass from "../../features/classes/SingleClass"

const Class = () => {
  const { id } = useParams() 

  return (
    <article>
      <SingleClass id={id} />
    </article>
  )
}
export default Class