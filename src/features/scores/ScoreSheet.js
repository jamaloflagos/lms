import { useGetScoreSheetsQuery } from "./scoresApiSlice"

const ScoreSheet = ({ class_id, student_id }) => {
    const filter = class_id ? { class_id } : { student_id }
    const { data: score_sheets, isLoading, isSuccess, isError, error } = useGetScoreSheetsQuery(filter)

    let content;
    
    if (isLoading) content = <p>Loading...</p>
    if (isError) content = <p>{error?.data?.message}</p>
    if (isSuccess) {
        if (class_id) {
            const tables = score_sheets.map(score_sheet => score_sheet)
            content = (
                <div>
                    {tables}
                </div>
            )
        } else if (student_id) {
            content = (
                <table></table>
            )
        }
    }

  return content
}
export default ScoreSheet