import TestList from "../../features/tests/TestList"
import useAuth from "../../hooks/useAuth"

const Tests = () => {
  const { class_id } = useAuth()
  return (
    <>
      <article>
        <section>
          <TestList class_id={class_id} />
        </section>
      </article>
    </>
  )
}
export default Tests