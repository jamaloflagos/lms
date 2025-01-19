import { Link } from "react-router-dom";
import ExamList from "../../features/exams/ExamLists";
import useAuth from "../../hooks/useAuth";

const Exams = () => {
  const { class_id, has_made_full_tuition_fee_payment } = useAuth();

  return (
    <>
      <article>
        {!has_made_full_tuition_fee_payment && (
          <section className="p-6 bg-red-50 border border-red-200 rounded-lg shadow-md text-center">
            <p className="text-red-600 font-semibold mb-4">
              Make full school fee payment before you can take your exams.
            </p>
            <Link
              to="payments"
              className="inline-block px-6 py-2 bg-red-600 text-white font-medium rounded-lg shadow-sm hover:bg-red-700 transition duration-200"
            >
              Make Payment
            </Link>
          </section>
        )}

        <section>
          <ExamList class_id={class_id} />
        </section>
      </article>
    </>
  );
};
export default Exams;
