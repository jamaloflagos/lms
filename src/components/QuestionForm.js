const QuestionForm = ({ questions, setQuestions }) => {
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], answer: null },
    ]);
  };

  const handleQuestionChange = (index, field, value, optIndex) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) => {
        if (i === index) {
          if (field === "options") {
            const newOptions = [...q.options];
            newOptions[optIndex] = value;
            return { ...q, options: newOptions };
          }
          return { ...q, [field]: value };
        }
        return q;
      })
    );
  };

  const removeQuestion = (index) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      {questions.map((question, index) => (
        <div key={index} className="question-group mb-4">
          <label className="block text-gray-700">Question {index + 1}:</label>
          <input
            type="text"
            placeholder="Question"
            value={question.question}
            onChange={(e) =>
              handleQuestionChange(index, "question", e.target.value)
            }
            className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
          />
          {question.options.map((option, optIndex) => (
            <input
              key={optIndex}
              type="text"
              placeholder={`Option ${optIndex + 1}`}
              value={option}
              onChange={(e) =>
                handleQuestionChange(index, "options", e.target.value, optIndex)
              }
              className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
            />
          ))}
          <label className="block text-gray-700">
            Correct Answer:
            <select
              value={question.answer || ""}
              onChange={(e) =>
                handleQuestionChange(index, "answer", parseInt(e.target.value))
              }
              className="w-full border border-gray-300 rounded px-3 py-2 mt-2"
            >
              <option value="">Select Correct Answer</option>
              {question.options.map((_, optIndex) => (
                <option key={optIndex} value={optIndex}>
                  Option {optIndex + 1}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={() => removeQuestion(index)}
            className="bg-red-500 text-white py-1 px-3 rounded mt-2"
          >
            Remove Question
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addQuestion}
        className="bg-green text-white py-2 px-4 rounded mt-4"
      >
        Add Question
      </button>
    </>
  );
};

export default QuestionForm;
