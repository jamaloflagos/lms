import { useParams } from "react-router-dom"
import { useCustomQuery } from "../../hooks/useCustomQuery";
import Questions from "../Questions";

const Test = () => {
    const { testId } = useParams();
    const { data: test, isLoading, isError } = useCustomQuery(['test', testId], `/${testId}`);

    if (isLoading) return <div>Loading test data....</div>
    if (isError) return <div>Error loading test data</div>
  return (
    <div>
        {
            test && (
                <div>
                    <Questions questions={test.questions} url={''}/>
                </div>
            )
        }
    </div>
  )
}
export default Test