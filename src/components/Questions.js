import React, { memo, useState } from "react";
import Question from "./Question";
import Pagination from "./Pagination";

function Questions({ questions, setSelectedAnswers, selectedAnswers }) {
  const [currentPage, setCurrentPage] = useState(0);

  const paginate = (number) => {
    setCurrentPage(number - 1);
  };

  const handleAnswerChange = (questionIndex, selectedOption) => {
    setSelectedAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[questionIndex] = selectedOption;
      return updatedAnswers;
    });
  };

  if (!questions || questions.length === 0) {
    return <p className="text-center text-gray-500">No questions available.</p>;
  }

  const currentQuestion = questions[currentPage];

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Question
        question={currentQuestion}
        selectedAnswers={selectedAnswers}
        handleAnswerChange={handleAnswerChange}
        questionIndex={currentPage}
      />
      <Pagination
        totalQuestions={questions.length}
        questionsPerPage={1}
        paginate={paginate}
        currentPage={currentPage + 1}
      />
    </div>
  );
}

export default memo(Questions);
