import ScoreSheet from "../../features/scores/ScoreSheet"
import useAuth from "../../hooks/useAuth"

export const Reports = () => {
    const { user_id: studentId } = useAuth()

    const content = (
        <>
            <article>
                <header>
                    <h1>Score Sheet</h1>
                </header>
                <section>
                    <ScoreSheet student_id={studentId}/>
                </section>
                <button>Download Report Card</button>
            </article>
        </>
    )
  return content
}
