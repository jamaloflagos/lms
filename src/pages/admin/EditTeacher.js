import { useParams } from "react-router-dom";
import { EditTeacher as EditATeacher} from "../../features/teachers/EditTeacher";

const EditTeacher = () => {
  const { id } = useParams();

  return (
    <>
      <article>
        <EditATeacher id={id} />
      </article>
    </>
  )
}
export default EditTeacher