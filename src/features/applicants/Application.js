import { useGetClassesQuery } from "../classes/classesApiSlice"
import ApplicantForm from "./ApplicationForm"

const Application = () => {
        const { classes = [] } = useGetClassesQuery(undefined, {
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
  return <ApplicantForm classes={classes}/>
}
export default Application