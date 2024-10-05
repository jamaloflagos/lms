import { Link } from "react-router-dom";
import { useCustomQuery } from "../../hooks/useCustomQuery"

const Exams = () => {
    const { data: exams, isLoading, isError } = useCustomQuery(['exams'], '');

    if (isLoading) return <div>Loading exams data...</div>
    if (isError) return <div>Error loading tests</div>
  return (
    <div>
        {
            exams && (
                exams.map(exam => (
                    <div>
                        <div></div>
                        <Link to={`exam/${exam.id}`}>{exam.title}</Link>
                    </div>
                ))
            )
        }
    </div>
  )
}
export default Exams