import { Link } from "react-router-dom"
import { useGetClassesQuery } from "./classesApiSlice"

const ClassesList = () => {
    const { classes = [], isLoading, isSuccess, isError, error} = useGetClassesQuery(undefined, {
        selectFromResult: (result) => {
            const classes = Object.values(result?.data?.entities || {})
            return {
                ...result,
                classes
            }
        }
    })

    let content;
    if (isLoading) content = <p>Loading...</p>

    if (isError) content = <p>{error?.data?.message}</p>

    if (isSuccess) {
        const listItems = classes.map(_class => (
            <li key={_class.id}>
                <Link to={`${_class.id}`}>
                    <span>{_class.name} ({_class.category})</span>
                    <span>{_class.students}</span>
                </Link>
            </li>
        ))

        content = <ul>{listItems}</ul>
    }

  return content
}
export default ClassesList