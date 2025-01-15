import { useParams } from "react-router-dom"
import SingleTeacher from "../../features/teachers/SingleTeacher"

const Teacher = () => {
  const { id } = useParams()
  return (
    <>
      <article>
        <SingleTeacher id={id} />
      </article>
    </>
  )
}
export default Teacher