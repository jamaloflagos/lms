import { useState } from "react";
import { useCustomQuery } from "../hooks/useCustomQuery"
import ClassForm from "./ClassForm";
import { Link } from "react-router-dom";

const ClassList = () => {
    const { data: classes, isLoading, isError, error } = useCustomQuery(['classes', '']);
    const [addClass, setAddClass] = useState(false)

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error fetching classes due to {error.message}</div>
  return (
    <div>
        {
          classes.map(_class => (
            <Link to={`/class/${_class.name}`}>
              <span>{_class.name}</span>
              <span>Nickname: {_class.nick_name}</span>
              <span>Category: {_class.category}</span>
            </Link>
          ))
        }

        <div>
          <button onClick={() => setAddClass(prev => !prev)}>Add New Class</button>
        </div>

        <div>
          {addClass && (
            <ClassForm />
          )}
        </div>
    </div>
  )
}
export default ClassList