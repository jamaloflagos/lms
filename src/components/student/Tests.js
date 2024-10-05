import { Link } from "react-router-dom";
import { useCustomQuery } from "../../hooks/useCustomQuery"

const Tests = () => {
    const { data: tests, isLoading, isError } = useCustomQuery(['tests'], '');

    if (isLoading) return <div>Loading tests data...</div>
    if (isError) return <div>Error loading tests</div>
  return (
    <div>
        {
            tests && (
                tests.map(test => (
                    <div>
                        <div>

                        </div>
                        <Link to={`test/${test.id}`}>{test.title}</Link>
                    </div>
                ))
            )
        }
    </div>
  )
}
export default Tests