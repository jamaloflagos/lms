import ScoreSheet from "../../features/scores/ScoreSheet"
import useAuth from "../../hooks/useAuth"

export const Reports = () => {
    const { class_id } = useAuth()

    const content = (
        <>
            <article>
                <header>
                    <h1>Score Sheet</h1>
                </header>
                <section>
                    <ScoreSheet class_id={class_id}/>
                </section>
            </article>
        </>
    )
    
  return content
}
