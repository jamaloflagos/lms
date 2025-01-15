import ExamList from "../../features/exams/ExamLists"
import useAuth from "../../hooks/useAuth"

const Exams = () => {
  const { class_id } = useAuth()
  
  return (
    <>
      <article>
        <header>
          <h1>Exams</h1>
        </header>
        <section>
          <ExamList class_id={class_id} />
        </section>
      </article>
    </>
  )
}
export default Exams