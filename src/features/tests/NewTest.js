import { useEffect, useState } from "react";
import { useAddNewTestMutation } from "./testsApiSlice";
import QuestionForm from "../../components/QuestionForm";
import SuccessPromptModal from "../../components/SuccessPromptModal";

export const NewTest = ({ class_id, subject_id }) => {
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], answer: null },
  ]);
  const [timeAllowed, setTimeAllowed] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState({});
  const [displaySuccessModal, setDisplaySuccessModal] = useState(false)
  const [addNewTest, { isLoading, isSuccess, isError, error }] =
    useAddNewTestMutation();

  const canSave =
    [questions.length > 0, dueDate, class_id, subject_id, timeAllowed].every(
      Boolean
    ) && !isLoading;

  const validateForm = () => {
    const newErrors = {};
    if (!questions.length || questions.some((q) => !q.question)) {
      newErrors.questions = "All questions must be filled.";
    }
    if (!dueDate) newErrors.dueDate = "Due date is required.";
    if (!timeAllowed) newErrors.timeAllowed = "Time allowed is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (validateForm() && canSave) {
      await addNewTest({
        questions,
        due_date: dueDate,
        class_id,
        subject_id,
        time_allowed: timeAllowed,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setDueDate("");
      setTimeAllowed("");
      setQuestions([{ question: "", options: ["", "", "", ""], answer: null }]);
      setDisplaySuccessModal(true)
    }
  }, [isSuccess]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={onSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-lg"
      >
        <header className="mb-4 font-bold text-3xl text-blue-600">New Test</header>
        {isError && (
          <p className="text-red-500 text-sm mb-4">{error?.data?.message}</p>
        )}

        <QuestionForm questions={questions} setQuestions={setQuestions} />

        {errors.questions && (
          <p className="text-red-500 text-sm mb-4">{errors.questions}</p>
        )}

        <div className="mb-4">
          <label htmlFor="dueDate" className="block text-gray-700">
            Due Date:
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.dueDate && (
            <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="timeAllowed" className="block text-gray-700">
            Time Allowed (in Minutes):
          </label>
          <input
            type="number"
            id="timeAllowed"
            value={timeAllowed}
            onChange={(e) => setTimeAllowed(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.timeAllowed && (
            <p className="text-red-500 text-sm mt-1">{errors.timeAllowed}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        //   disabled={!canSave}
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </form>
      {displaySuccessModal && <SuccessPromptModal setDisplaySuccessModal={setDisplaySuccessModal} />}
    </div>
  );
};
