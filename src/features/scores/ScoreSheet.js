import Spinner from "../../components/Spinner";
import useAuth from "../../hooks/useAuth";
import { useGetScoreSheetsQuery } from "./scoresApiSlice";

const ScoreSheet = ({ class_id, student_id }) => {
    const filter = class_id ? { class_id } : { student_id };
    const { status } = useAuth()
    const {
        data: score_sheets = [],
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetScoreSheetsQuery(filter);

    let content;

    if (isLoading) {
        content = <Spinner />;
    } else if (isError) {
        content = <p className="text-red-600">{error?.data?.message}</p>;
    } else if (isSuccess) {
        if (score_sheets.length === 0) {
            content = (
                <p className="text-gray-500 italic">
                    {status === "Teacher" ? "No score sheets available for the selected class." : "No score sheets available for you yet."}
                </p>
            );
        } else if (class_id) {
            const tables = score_sheets.map((score_sheet, index) => (
                <div
                    key={index}
                    className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 mb-4"
                >
                    <h3 className="font-medium text-gray-800">
                        {score_sheet.subject_name}
                    </h3>
                    <p className="text-gray-600">
                        Score: {score_sheet.score} / {score_sheet.total}
                    </p>
                </div>
            ));
            content = <div className="space-y-4">{tables}</div>;
        } else if (student_id) {
            content = (
                <table className="table-auto w-full bg-white rounded-lg shadow-sm border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left">Subject</th>
                            <th className="px-4 py-2 text-left">Score</th>
                            <th className="px-4 py-2 text-left">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {score_sheets.map((score_sheet, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-4 py-2">{score_sheet.subject_name}</td>
                                <td className="px-4 py-2">{score_sheet.score}</td>
                                <td className="px-4 py-2">{score_sheet.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        }
    }

    return <div>{content}</div>;
};

export default ScoreSheet;
