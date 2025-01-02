import { useState } from "react";
import LessonsList from "../lessons/LessonsList";
import { useGetModulesQuery } from "./modulesApiSlice"
import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth";

const ModulesList = () => {
  const { modules = [], isLoading, isSuccess, isError, error} = useGetModulesQuery('modulesList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    selectFromResult: result => {
      const modules = Object.values(result?.data?.entities || {}).map(module => ({
        id: module.id,
        title: module.title
      }))

      return {
        ...result,
        modules
      }
    }
  }) 
  const { isTeacher } = useAuth()
  const [activeIndex, setActiveIndex] = useState(null);

  const handleItemClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index); 
  };

  let content;

  if (isLoading) content = <p>Loading...</p>

  if (isError) content = <p>{error?.data?.message}</p>

  if (isSuccess) {
    const accordionItems = modules.map((module, index) => (
      <div key={module.id}>
        {isTeacher ? (
          <div>
            <button onClick={() => handleItemClick(index)}>{module.title}</button>
            <Link>Edit</Link>
          </div>
        ) : <button onClick={() => handleItemClick(index)}>{module.title}</button>}
        <div>
        <LessonsList moduleId={module.id} />
        </div>
      </div>
    ))

    content = (
      <div>
        {accordionItems}
      </div>
    )
  }

  return content
}
export default ModulesList