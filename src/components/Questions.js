import React, { useState } from 'react';
import Question from './Question';
import Pagination from './Pagination';

function Questions({ questions, handleAnswersSubmit, setSelectedAnswers, selectedAnswers }) {
  const [currentPage, setCurrentPage] = useState(0);

  const paginate = (number) => {
      setCurrentPage(number - 1); // Adjusted to match the correct index
  }

  // const calculateScore = () => {
  //   return selectedAnswers.reduce((score, answer, index) => {
  //     return answer === questions[index].answer ? score + 1 : score;
  //   }, 0);
  // };
  
  const handleAnswerChange = (questionIndex, selectedOption) => {
    setSelectedAnswers(prevAnswers => 
      prevAnswers.map((answer, i) => 
        i === questionIndex ? selectedOption : answer
      )
    );
  };

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
    <button onClick={() => handleAnswersSubmit()}>Submit Answers</button>
  </div>
  )

  return content
}

export default Questions;
