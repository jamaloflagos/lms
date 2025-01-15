import { useState } from "react"
import { useGetClassesQuery } from "../classes/classesApiSlice"
import { useGetSubjectsQuery } from "../subjects/subjectsApiSlice"
import NewTeacherForm from "./NewTeacherForm"

const AddTeacher = () => { 
    const [subjectId, setSubjectId] = useState(1)
    const { subjects = [] } = useGetSubjectsQuery(undefined, {
        selectFromResult: ({ data }) => {
            const subjects = Object.values(data?.entities || {}).map(subject => ({
                id: subject.id,
                name: subject.name
            }))

            return {
                subjects
            }
        }
    })
    const { classes: filteredClasses = [] } = useGetClassesQuery(subjectId, {
        selectFromResult: ({ data }) => {
            const classes = Object.values(data?.entities || {}).map(_class => ({
                id: _class.id,
                name: _class.name
            }))
            return {
                classes
            }
        }
    }) 
    const { classes: allClasses = [] } = useGetClassesQuery(undefined, {
        selectFromResult: ({ data }) => {
            const classes = Object.values(data?.entities || {}).map(_class => ({
                id: _class.id,
                name: _class.name
            }))
            return {
                classes
            }
        }
    }) 

    const content = <NewTeacherForm allClasses={allClasses} filteredClasses={filteredClasses} sch_subjects={subjects} setSubjectId={setSubjectId}/>
  return content
}
export default AddTeacher