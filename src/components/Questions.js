import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Question from './Question';
import Pagination from './Pagination';

function Questions({questions, context, applicantId, studentId, lessonId, subjectName, scoreType, url, setSubmitted }) {
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
  const [currentPage, setCurrentPage] = useState(0);
  const [message, setMessage] = useState('');

  const paginate = (number) => {
      setCurrentPage(number - 1); // Adjusted to match the correct index
  }

  const mutation = useMutation({
    mutationFn: async (scoreData) => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scoreData),
      });
      if (!response.ok) {
        throw new Error('Internal Server Error');
      }

      return response.json();
    },
    onSuccess: () => {
      // setSubmitted(true);
    },

    onError: (error) => {
      setSubmitted(false);
    }
  });
console.log(typeof studentId)
  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return answer === questions[index].answer ? score + 1 : score;
    }, 0);
  };
  
  const handleSubmit = () => {
    if (window.confirm('Are you ready to submit?')) {
      let newScore = null;

      if (selectedAnswers.includes(null)) {
        const unselectedAnswers = selectedAnswers
            .map((answer, index) => answer === null ? index + 1 : null)
            .filter(questionNumber => questionNumber !== null);     

        return setMessage(`You did not answer question${unselectedAnswers.length > 1 ? 's' : ''} ${unselectedAnswers.join(', ')}`);
    }
    
      
      if (context === 'entrance-exam') {
        newScore = {
          applicant_id: applicantId,
          value: calculateScore(),
          percentage: (calculateScore() / questions.length) * 100
        };

        console.log(newScore)
      }

      if (context === 'lesson_exam') {
        newScore = {
          subject: subjectName,
          lesson: lessonId,
          student: Number(studentId),
          type: scoreType, 
          value: calculateScore(),
          date_submitted: new Date().toISOString()
        };
        console.log(newScore)
      }

      console.log(newScore)

      mutation.mutate(newScore);
    }
  };

  const handleAnswerChange = (questionIndex, selectedOption) => {
    setSelectedAnswers(prevAnswers => 
      prevAnswers.map((answer, i) => 
        i === questionIndex ? selectedOption : answer
      )
    );
  };

  return (
    <div className='quiz'>
      {
        questions.length > 0 && (
          <div>
            <Question 
              question={questions[currentPage]} 
              selectedAnswers={selectedAnswers} 
              handleAnswerChange={handleAnswerChange} 
              questionIndex={currentPage} // Directly use currentPage as the index
            />
            <Pagination 
              totalQuestions={questions.length} 
              questionsPerPage={1} 
              paginate={paginate} 
              currentPage={currentPage + 1} // Pass 1-based page index
            />
            {message && <p>{message}</p>}
            <button onClick={handleSubmit}>Submit Answers</button>
          </div>
        )
      }
      {mutation.isLoading && <p>Submitting...</p>}
      {mutation.isError && <p>Error: {mutation.error.message}</p>}
      {mutation.isSuccess && <p>Submitted successfully!</p>}
    </div>
  );
}

export default Questions;
