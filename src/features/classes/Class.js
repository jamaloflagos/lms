import { useParams } from "react-router-dom"
import { useGetClassesQuery } from "./classesApiSlice"
import StudentsList from "../students/StudentsList"

const Class = () => {
  const { id } = useParams()

  const { _class  } = useGetClassesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      _class: data?.entities[id]
    })
  })

  let content;
  if (_class) {
    content = (
      <article>
        <section>
          <span>{_class.name} ({_class.category})</span>
          <span>{_class.students}</span>
        </section>
        <section>
          <StudentsList classId={_class.id}/>
        </section>
      </article>
    )
  } else content = null

  return content
}
export default Class