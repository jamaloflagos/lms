const Question = ({question, selectedAnswers, handleAnswerChange, questionIndex}) => {
  return (
    <div>
{ question && (
        <div className='question'>
          <h3>{question.question}</h3>
          <div>
            {question.options && question.options.map((option, i) => (
              <div key={i} className='answer'>
                <label>
                  <input 
                    type="radio"
                    name={`question${questionIndex}`}
                    value={i}
                    checked={selectedAnswers[questionIndex] !== undefined && selectedAnswers[questionIndex] === i}
                    onChange={() => handleAnswerChange(questionIndex, i)}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      )
      }
    </div>
  )
}
export default Question