import { useEffect, useState } from "react";
import { useGetAssignmentsQuery } from "./assignmentsApiSlice"
import Questions from "../../components/Questions";
import { useAddNewScoreMutation } from "../scores/scoresApiSlice";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const SingleAssignment = ({ id, class_id, subject_id }) => {
    const [submitScore, {isLoading, isSuccess}] = useAddNewScoreMutation()
    const { user_id } = useAuth()
    const navigate = useNavigate()
    const [selectedAnswers, setSelectedAnswers] = useState([])
      const [displayPrompt, setDisplayPrompt] = useState(false);
      const [canSubmit, setCanSubmit] = useState(false);
      const [errorMessage, setErrorMessage] = useState("");
    const { questions, time_allowed } = useGetAssignmentsQuery({ class_id, subject_id }, {
        selectFromResult: ({ data }) => ({
            questions: data?.entities[id]?.questions,
            time_allowed: data?.entities[id]?.time_allowed
        })
    })
    const [timer, setTimer] = useState(time_allowed);

    const calculateScore = () => {
        return selectedAnswers.reduce((score, answer, index) => {
          return answer === questions[index].answer ? score + 1 : score;
        }, 0);
      };

    const validateAnswers = () => {
        const unanswered = selectedAnswers
          .map((answer, index) => (answer === null ? index + 1 : null))
          .filter((index) => index !== null);
    
        if (unanswered.length > 0) {
          setErrorMessage(
            `You have not answered the following questions: ${unanswered.join(", ")}`
          );
          return false;
        }
    
        setErrorMessage("");
        return true;
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateAnswers()) {
          return;
        }
    
    
        setDisplayPrompt(true);
        const score = calculateScore();

        const scoreData = {
            value: score,
            score_type: 'Assignment',
            subject: subject_id,
            student: user_id
        }
    
        const canSave = Object.values(scoreData).every(Boolean) && !isLoading;
    
        if (canSave && canSubmit) {

          await submitScore(scoreData);
        }
      };

      const onYesClicked = () => {
        setDisplayPrompt(false);
        setCanSubmit(true);
      };
    
      const onNoClicked = () => {
        setDisplayPrompt(false);
        setCanSubmit(false);
      };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
      };
    
      const getColor = () => {
        return timer < 600 ? "red" : "green";
      };

      
      useEffect(() => {
        if (questions?.length) {
          setSelectedAnswers(Array(questions.length).fill(null));
        }
      }, [questions]);

        useEffect(() => {
          const intervalId = setInterval(() => {
            if (timer > 0) {
              setTimer((prevTimer) => prevTimer - 1);
            }
          }, 1000);
      
          return () => clearInterval(intervalId);
        }, [timer]);

        useEffect(() => {
            if (isSuccess) {
                navigate('')
            }
        }, [isSuccess, navigate])

        let content;

        if (questions && time_allowed) {
            content = (
                  <article>
                    <header>
                      <h1>Assignment</h1>
                      <div style={{ color: getColor() }}>Time Remaining: {formatTime(timer)}</div>
                    </header> 
                    <Questions
                      setSelectedAnswers={setSelectedAnswers}
                      selectedAnswers={selectedAnswers}
                      questions={questions}
                    />
                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                    <button onClick={handleSubmit}>Submit</button>
            
                    {displayPrompt && (
                      <div>
                        <p>Are you sure you want to submit?</p>
                        <button onClick={onNoClicked}>No</button>
                        <button onClick={onYesClicked}>Yes</button>
                      </div>
                    )}
                  </article>
                );
        } else content = null

  return content
}
export default SingleAssignment