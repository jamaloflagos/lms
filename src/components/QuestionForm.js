
const QuestionForm = ({ questions, setQuestions}) => {
    
      const addQuestion = () => {
        setQuestions([...questions, { question: '', options: ['', '', '', ''], answer: null }]);
      };
    
      const handleQuestionChange = (index, field, value, optIndex) => {
    
        setQuestions(prevQuestions => prevQuestions.map((q, i) => {
          if (i === index) {
              if (field === 'options') {
                  // Use spread operator to create a new array and add the new option
                  const newOptions = [...q.options];
                    if (optIndex !== undefined) { // Updating an existing option
                        newOptions[optIndex] = value;
                    } else if (newOptions.length < 4) { // Adding a new option (only if less than 4)
                        newOptions.push(value);
                    } 
                    return { ...q, options: newOptions }
                  // return { ...q, options: [...q.options, value] };
              }
              
              return { ...q, [field]: value }; 
              }
            
          return q;
      }));
      };
    
      const removeQuestion = (index) => {
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
      };

      const questionInputs = questions.map((question, index) => (
        <div key={index} className="question-group">
          <input
            type="text"
            placeholder="Question"
            value={question.question}
            onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
          />
          {Array.isArray(question.options) && question.options.map((option, optIndex) => (
            <div key={optIndex}>
              <input
                type="text"
                placeholder={`Option ${optIndex + 1}`}
                value={option}
                onChange={(e) => handleQuestionChange(index, 'options', e.target.value, optIndex)}
              />
            </div>
          ))}
          <select
            value={question.answer || ''}
            onChange={(e) => handleQuestionChange(index, 'answer', parseInt(e.target.value))}
          >
            <option value="">Select Correct Answer</option>
            {question.options.map((_, optIndex) => (
              <option key={optIndex} value={optIndex}>{optIndex}</option>
            ))}
          </select>
          <button type="button" onClick={() => removeQuestion(index)}>-</button>
        </div>
      ))
      
      const content = (
        <>
            {questionInputs}
            <button type="button" onClick={addQuestion}>Add Question</button>
        </>
      )

  return content
}
export default QuestionForm