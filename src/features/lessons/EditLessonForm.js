import { useEffect, useState } from "react";
import {
  useDeleteLessonMutation,
  useUpdateLessonMutation,
} from "./lessonsApiSlice";
import { useNavigate } from "react-router-dom";
import DeletePromptModal from "../../components/DeletePromptModal";

const EditLessonForm = ({ modules, lesson }) => {
  const [updateLesson, { isLoading, isSuccess, isError, error }] =
    useUpdateLessonMutation();
  const [
    deleteLesson,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteLessonMutation();
  const navigate = useNavigate();
  const [title, setTitle] = useState(lesson.title);
  const [module, setModule] = useState(lesson.module);
  const [note, setNote] = useState(lesson.note);
  const [estimated_time, setEstimatedTime] = useState(lesson.estimated_time);
  const [has_video, setHasVideo] = useState(lesson.has_video);
  const [video, setVideo] = useState(lesson.video);
  const [has_assignment, setHasAssignment] = useState(lesson.has_assignment);
  const [assignment_questions, setAssignmentQuestions] = useState(
    lesson.assignment_questions
  );
  const [canDelete, setCanDelete] = useState(false);
  const [displayDeletePrompt, setDisplayDeletePrompt] = useState(false);

  const handleQuestionChange = (index, field, value, optIndex) => {
    // const newQuestions = [...questions];
    // newQuestions[index][field] = value;
    // setQuestions(newQuestions);

    setAssignmentQuestions((prevQuestions) =>
      prevQuestions.map((q, i) => {
        if (i === index) {
          if (field === "options") {
            // Use spread operator to create a new array and add the new option
            const newOptions = [...q.options];
            if (optIndex !== undefined) {
              // Updating an existing option
              newOptions[optIndex] = value;
            } else if (newOptions.length < 4) {
              // Adding a new option (only if less than 4)
              newOptions.push(value);
            }
            return { ...q, options: newOptions };
            // return { ...q, options: [...q.options, value] };
          }

          return { ...q, [field]: value };
        }

        return q;
      })
    );
  };

  const addQuestion = () => {
    setAssignmentQuestions([
      ...assignment_questions,
      { question: "", options: ["", "", "", ""], answer: null },
    ]);
  };

  const removeQuestion = (index) => {
    const newQuestions = assignment_questions.filter((_, i) => i !== index);
    setAssignmentQuestions(newQuestions);
  };
  const onFileChange = (event) => {
    const file = event.target.files[0];
    // const fileName = file.name;
    // const extension = fileName.split('.').pop().toLowerCase();
    // if (!extension === 'js') {
    //   setJSMessage("Please select an js file.");
    //   return;
    // }
    // setJSMessage(null);
    setVideo(file);
  };

  const formData = new FormData();
  const canSave =
    [title, note, estimated_time, module].every(Boolean) && !isLoading;
  const onSaveLessonClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      const formDataArr = [title, note, estimated_time];
      if (has_video) {
        formDataArr.push(has_video);
        formDataArr.push(video);
      }

      if (has_assignment) {
        formDataArr.push(has_assignment);
        formDataArr.push(assignment_questions);
      }
      
      formDataArr.forEach((data) => formData.append(data, data));
      formData.append('id', lesson.id)
      await updateLesson({ ...formData });
    }
  };

  const onDeleteLessonClicked = async () => {
    if (canDelete) {
      await deleteLesson({ id: lesson.id });
    }
  };

  const errContent = (error?.data?.message || delError?.data?.message) ?? ""
  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle("");
      setModule("");
      setNote("");
      setEstimatedTime("");
      setHasVideo(false);
      setVideo("");
      setHasAssignment(false);
      setAssignmentQuestions([]);
      navigate();
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const options = modules.map((module) => (
    <option value={module.id}>{module.tile}</option>
  ));

  const assignmentQuestions = assignment_questions.map((question, index) => (
    <div key={index} className="question-group">
      <label htmlFor="question">
        <input
          type="text"
          placeholder="Question"
          value={question.question}
          onChange={(e) =>
            handleQuestionChange(index, "question", e.target.value)
          }
        />
      </label>
      {Array.isArray(question.options) &&
        question.options.map((option, optIndex) => (
          <label htmlFor="option" key={optIndex}>
            <input
              type="text"
              id="option"
              placeholder={`Option ${optIndex + 1}`}
              value={option}
              onChange={(e) =>
                handleQuestionChange(index, "options", e.target.value, optIndex)
              }
            />
          </label>
        ))}
      <label htmlFor="answer">
        <select
          id="anwser"
          value={question.answer || ""}
          onChange={(e) =>
            handleQuestionChange(index, "answer", parseInt(e.target.value))
          }
        >
          <option value="">Select Correct Answer</option>
          {question.options.map((_, optIndex) => (
            <option key={optIndex} value={optIndex}>
              {optIndex}
            </option>
          ))}
        </select>
      </label>
      <button type="button" onClick={() => removeQuestion(index)}>
        -
      </button>
    </div>
  ));

  const content = (
    <>
      {(isError || isDelError) && <p>{errContent}</p>}

      <form onSubmit={(e) => e.preventDefault()} encType="multipart/form-data">
        <div>
          <h2>Edit Lesson #{lesson.title}</h2>
          <div>
            <button onClick={onSaveLessonClicked}>Save</button>
            <button onClick={onDeleteLessonClicked}>Delete</button>
          </div>
        </div>

        <label htmlFor="module">
          Module:
          <select
            id="module"
            value={module}
            onChange={(e) => setModule(e.target.value)}
          >
            {options}
          </select>
        </label>
        <label htmlFor="title">
          Title:
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label htmlFor="note">
          Note:
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </label>
        <div>
          <span>Has Assignment?</span>
          <button onClick={setHasAssignment(true)}>Yes</button>
        </div>
        {has_assignment && assignmentQuestions}
        <button type="button" onClick={addQuestion}>
          Add More Question
        </button>
        <div>
          <span>Has Video?</span>
          <button onClick={setHasAssignment(true)}>Yes</button>
        </div>
        {has_video && (
          <label htmlFor="video">
            <input
              type="file"
              name="video"
              id="video"
              onChange={onFileChange}
            />
          </label>
        )}
        <button>Save</button>
      </form>

      {displayDeletePrompt && (
        <DeletePromptModal
          setCanDelete={setCanDelete}
          setDisplayDeletePrompt={setDisplayDeletePrompt}
        />
      )}
    </>
  );
  return content;
};
export default EditLessonForm;
