import { useParams } from "react-router-dom"
import TuitionFee from "../../features/payments/TuitionFee"

const Payments = () => {
    const { studentId } = useParams()
  return (
    <>
        <article>
            <header>
                <h1>Your Payment History For The Current Term</h1>
            </header>
            <section>
                <h1>Tuition Fee</h1>
                <TuitionFee student_id={studentId} />
            </section>
        </article>
    </>
  )
}
export default Payments