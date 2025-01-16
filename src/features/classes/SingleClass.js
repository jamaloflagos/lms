import { useGetClassesQuery } from "./classesApiSlice"
import StudentsList from "../students/StudentsList"

const SingleClass = ({ id }) => {

  const { _class  } = useGetClassesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      _class: data?.entities[id]
    })
  })

  let content;
  if (_class) {
    content = (
      <>
        <header>
          <span>{_class.name} ({_class.category})</span>
          <span>{_class.students}</span>
        </header>
        <section>
          <h1>Students</h1>
          <StudentsList classId={_class.id}/>
        </section>
      </>
    )
  } else content = null

  return content
}
export default SingleClass