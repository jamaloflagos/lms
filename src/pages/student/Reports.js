import ScoreSheet from "../../features/scores/ScoreSheet";
import useAuth from "../../hooks/useAuth";

export const Reports = () => {
  const { user_id: studentId } = useAuth();

  const content = (
    <>
      <article>
        <header>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Score Sheet
          </h2>
        </header>
        <section>
          <ScoreSheet student_id={studentId} />
        </section>
       <div className="flex justify-end pt-4">
       <button
                    className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Download Report Card
                </button>
       </div>
      </article>
    </>
  );
  return content;
};
