import { useEffect, useState } from "react";
import { useGenerateReportCardsMutation, useGetClassReportCardsQuery } from "../../features/scores/scoresApiSlice";
import ScoreSheet from "../../features/scores/ScoreSheet";
import useAuth from "../../hooks/useAuth";

export const Reports = () => {
    const { class_id, term_id } = useAuth();
    const [generateReportCards, { isSuccess, isLoading, isError, error }] =
        useGenerateReportCardsMutation();
    const {
        data: reportCards = [],
        isLoading: getIsLoading,
        isSuccess: getIsSuccess,
        isError: getIsError,
        error: getError,
    } = useGetClassReportCardsQuery({ class_id, term_id });

    const [activeTab, setActiveTab] = useState("scoreSheet");

    const generate = async () => {
        if (class_id && term_id) {
            await generateReportCards({ class_id, term_id });
        }
    };

    useEffect(() => {
        if (isSuccess) {
            setActiveTab("reportCard");
        }
    }, [isSuccess]);

    const content = (
        <article className="p-6 bg-gray-100 rounded-lg shadow-md">
            <header className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-bold text-gray-800">Reports</h1>
                <button
                    onClick={generate}
                    className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    {isLoading ? "Generating..." : "Generate Report Cards"}
                </button>
            </header>
            <nav className="flex mb-6 space-x-4">
                <button
                    className={`px-4 py-2 font-medium rounded-lg ${
                        activeTab === "scoreSheet"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => setActiveTab("scoreSheet")}
                >
                    Score Sheet
                </button>
                <button
                    className={`px-4 py-2 font-medium rounded-lg ${
                        activeTab === "reportCard"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => setActiveTab("reportCard")}
                >
                    Report Card
                </button>
            </nav>
            <section>
                {activeTab === "scoreSheet" && (
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Score Sheet</h2>
                        <ScoreSheet class_id={class_id} />
                    </div>
                )}
                {activeTab === "reportCard" && (
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Report Card</h2>
                        {getIsLoading && <p className="text-gray-600">Loading Report Cards...</p>}
                        {getIsError && (
                            <p className="text-red-600">
                                Error: {getError?.data?.message || "Something went wrong."}
                            </p>
                        )}
                        {getIsSuccess && reportCards.length > 0 ? (
                            <ul className="space-y-2">
                                {reportCards.map((card) => (
                                    <li
                                        key={card.id}
                                        className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
                                    >
                                        <p>
                                            <strong>Student:</strong> {card.student_name}
                                        </p>
                                        <p>
                                            <strong>Average Score:</strong> {card.overall_average}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-gray-600">
                                <p>No report cards found. Click "Generate" to create them.</p>
                            </div>
                        )}
                    </div>
                )}
            </section>
        </article>
    );

    return content;
};
