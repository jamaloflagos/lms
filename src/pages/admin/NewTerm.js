import { NewTerm as AddNewterm } from "../../features/terms/NewTerm"

const NewTerm = () => {
  return (
    <>
        <article>
            <header>
                <h1>New Term</h1>
            </header>
            <section>
                <AddNewterm />
            </section>
        </article>
    </>
  )
}
export default NewTerm