import React, { memo, useState } from 'react';
import Question from './Question';
import Pagination from './Pagination';

function Questions({ questions, setSelectedAnswers, selectedAnswers }) {
  const [currentPage, setCurrentPage] = useState(0);

  const paginate = (number) => {
      setCurrentPage(number - 1);
  }
  
  const handleAnswerChange = (questionIndex, selectedOption) => {
    setSelectedAnswers(prevAnswers => 
      prevAnswers.map((answer, i) => 
        i === questionIndex ? selectedOption : answer
      )
    );
  };

  // const handleAnswerChange = (questionIndex, selectedOption) => {
  //   setSelectedAnswers((prevAnswers) =>
  //     prevAnswers.map((answer, i) => (i === questionIndex ? selectedOption : answer))
  //   );
  // };

  const content = (
    <div>
    <Question 
      question={questions[currentPage]} 
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
  )

  return content
}

export default memo(Questions);
