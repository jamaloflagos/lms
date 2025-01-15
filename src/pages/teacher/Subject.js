import { useParams } from "react-router-dom";
import SingleSubject from "../../features/subjects/SingleSubject"

export const Subject = () => {
  const { subjectId } = useParams();
  return (
    <>
      <article>
        <SingleSubject subjectId={subjectId} />
      </article>
    </>
  )
}