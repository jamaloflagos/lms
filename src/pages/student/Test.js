import { useParams } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import SingleTest from "../../features/tests/SingleTest"

const Test = () => {
  const { testId } = useParams()
  const { class_id } = useAuth()

  return <SingleTest id={testId} class_id={class_id} />
}
export default Test