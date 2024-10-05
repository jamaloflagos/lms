import { useParams } from "react-router-dom"
import { useCustomQuery } from "../../hooks/useCustomQuery";
import Questions from "../Questions";

const Exam = () => {
    const { examId } = useParams();
    const { data: exam, isLoading, isError } = useCustomQuery(['exam', examId], `/${examId}`);

    if (isLoading) return <div>Loading data...</div>
    if (isError) return <div>Error fetching data</div>
  return (
    <div>
        {
            exam && (
                <div>
                <Questions questions={exam.questions} url={''}/>
                </div>
            )
        }
    </div>
  )
}
export default Exam