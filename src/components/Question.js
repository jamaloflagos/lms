import { memo } from "react"

const Question = ({ question, selectedAnswers, handleAnswerChange, questionIndex }) => {
  const questionNumber = questionIndex + 1
  const options = (
    question.options.map((option, i) => (
      <label key={i}>
        <input 
          type="radio"
          name={`question${questionIndex}`}
          value={i}
          checked={selectedAnswers[questionIndex] !== undefined && selectedAnswers[questionIndex] === i}
          onChange={() => handleAnswerChange(questionIndex, i)}
        />
        {option}
      </label>
  ))
  )

  const content = (
    <div className='question'>
        <h3>{questionNumber}. {question.question}</h3>
        <div>
          {options}
        </div>
    </div>
  )

  return content
}
export default memo(Question)