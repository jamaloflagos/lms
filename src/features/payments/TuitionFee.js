import useAuth from "../../hooks/useAuth"

const TuitionFee = ({ student_id }) => {
    const { term_id } = useAuth()
    
  return (
    <div>TuitionFee</div>
  )
}
export default TuitionFee