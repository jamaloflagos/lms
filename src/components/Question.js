import React, { memo } from "react";

const Question = ({ question, selectedAnswers, handleAnswerChange, questionIndex }) => {
  const questionNumber = questionIndex + 1;

  if (!question || !question.options || question.options.length === 0) {
    return <p className="text-gray-500">Question data is incomplete.</p>;
  }

  return (
    <div className="p-4 border rounded-md shadow-sm mb-4 bg-white">
      <h3 className="text-lg font-semibold mb-3">
        {questionNumber}. {question.question}
      </h3>
      <div className="space-y-2">
        {question.options.map((option, i) => (
          <label
            key={i}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="radio"
              name={`question${questionIndex}`}
              value={i}
              checked={selectedAnswers[questionIndex] === i}
              onChange={() => handleAnswerChange(questionIndex, i)}
              className="form-radio text-blue-500"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default memo(Question);
