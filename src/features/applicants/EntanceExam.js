import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Questions from "../../components/Questions";
import {
  useGetEntranceExamQuestionsQuery,
  useSubmitEntranceExamAnswersMutation,
} from "./applicantsApiSlice";

const EntranceExam = ({ id: applicantId}) => {
  const [timer, setTimer] = useState(3600);
  const [displayPrompt, setDisplayPrompt] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [
    submitAnswers,
    {
      isLoading: isSubmitLoading,
      isSuccess: isSubmitSuccess,
      isError: isSubmitError,
      error: submitError,
    },
  ] = useSubmitEntranceExamAnswersMutation();

  const {
    data: questions,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetEntranceExamQuestionsQuery();

  const [selectedAnswers, setSelectedAnswers] = useState([]);

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

  const onYesClicked = () => {
    setDisplayPrompt(false);
    setCanSubmit(true);
  };

  const onNoClicked = () => {
    setDisplayPrompt(false);
    setCanSubmit(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAnswers()) {
      return;
    }


    setDisplayPrompt(true);
    const score = calculateScore();
    console.log(score)
    const percentage = (score / questions.length) * 100;
    const scoreData = {
      applicant_id: applicantId,
      score,
      percentage,
    };

    const canSave = Object.values(scoreData).every(Boolean) && !isSubmitLoading;

    if (canSave && canSubmit) {
      console.log('yes')
      await submitAnswers(scoreData);
    }
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

  const errContent =
    (error?.data || submitError?.data) ?? "";

  let content;
  if (isLoading) content = <p>Loading....</p>;
  if (isError || isSubmitError) content = <p>{errContent}</p>;
  if (isSubmitSuccess)
    content = <p>You have successfully answered your entrance exam. <Link to={"/applicant/dashboard"}>Go to your Dashboard</Link></p>;
  if (isSuccess) {
    content = (
      <article>
        <header>
          <h1>Entrance Exam</h1>
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
  }
  return content;
};

export default EntranceExam;
