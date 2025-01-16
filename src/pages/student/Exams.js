import { Link } from "react-router-dom"
import ExamList from "../../features/exams/ExamLists"
import useAuth from "../../hooks/useAuth"

const Exams = () => {
  const { class_id, has_made_full_tuition_fee_payment } = useAuth()
  
  return (
    <>
      <article>
        <header>
          <h1>Exams</h1>
        </header>
        {!has_made_full_tuition_fee_payment && (
          <section>
            <p>Make full school fee payment before you can take your exams</p>
            <Link to={'payments'}>Make Payment</Link>
          </section>
        )}
        <section>
          <ExamList class_id={class_id} />
        </section>
      </article>
    </>
  )
}
export default Exams