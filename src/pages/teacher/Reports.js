import { useEffect, useState } from "react";
import { useGenerateReportCardsMutation, useGetClassReportCardsQuery } from "../../features/scores/scoresApiSlice";
import ScoreSheet from "../../features/scores/ScoreSheet";
import useAuth from "../../hooks/useAuth";

export const Reports = () => {
    const { class_id, term_id } = useAuth();
    // const [refresh, setRefresh] = useState(false)
    const [generateReportCards, {isSuccess, isLoading, isError, error }] =
        useGenerateReportCardsMutation();
    const { data: reportCards = [], isLoading: getIsLoading, isSuccess: getIsSuccess, isError: getIsError, error: getError } = useGetClassReportCardsQuery({ class_id, term_id})

    const [activeTab, setActiveTab] = useState("scoreSheet"); 

    const generate = async () => {
        if (class_id && term_id) {
            await generateReportCards({ class_id, term_id });
        }
    };

useEffect(() => {
    if (isSuccess) {
        // setRefresh(true)
        setActiveTab("reportCard")
    }
}, [isSuccess])

    const content = (
        <article>
            <header>
                <h1>Reports</h1>
                <button onClick={generate}>Generate Report Cards</button>
            </header>
            <nav className="tab-navigation">
                <button
                    className={activeTab === "scoreSheet" ? "active-tab" : ""}
                    onClick={() => setActiveTab("scoreSheet")}
                >
                    Score Sheet
                </button>
                <button
                    className={activeTab === "reportCard" ? "active-tab" : ""}
                    onClick={() => setActiveTab("reportCard")}
                >
                    Report Card
                </button>
            </nav>
            <section>
                {activeTab === "scoreSheet" && (
                    <div>
                        <h2>Score Sheet</h2>
                        <ScoreSheet class_id={class_id} />
                    </div>
                )}
                {activeTab === "reportCard" && (
                    <div>
                        <h2>Report Card</h2>
                        {getIsLoading && <p>Loading Report Cards...</p>}
                        {getIsError && <p>Error: {getError?.data?.message || "Something went wrong."}</p>}
                        {getIsSuccess && reportCards.length > 0 ? (
                            <ul>
                                {reportCards.map((card) => (
                                    <li key={card.id}>
                                        Student: {card.student_name}, Average Score: {card.overall_average}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div>
                                <button onClick={generate}>Generate</button>
                                {isLoading && <p>Generating....</p>}
                                {isError && <p>Error generating report card: {error?.data?.message}</p>}
                            </div>
                        )}
                    </div>
                )}
            </section>
        </article>
    );

    return content;
};
