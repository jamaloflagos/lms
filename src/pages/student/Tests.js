import TestList from "../../features/tests/TestList"
import useAuth from "../../hooks/useAuth"

const Tests = () => {
  const { class_id } = useAuth()
  return (
    <>
      <article>
        <header>
          <h1>Tests</h1>
        </header>
        <section>
          <TestList class_id={class_id} />
        </section>
      </article>
    </>
  )
}
export default Tests