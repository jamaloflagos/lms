import AssignmentList from "../../features/assignments/AssignmentList"
import useAuth from "../../hooks/useAuth"

const Assignments = () => {
  const { class_id } = useAuth()

  return (
    <>
      <article>
        <section>
          <AssignmentList class_id={class_id} />
        </section>
      </article>
    </>
  )
}
export default Assignments