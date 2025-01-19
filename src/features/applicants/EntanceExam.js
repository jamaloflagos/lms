import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Questions from "../../components/Questions";
import {
  useGetEntranceExamQuestionsQuery,
  useSubmitEntranceExamAnswersMutation,
} from "./applicantsApiSlice";

const EntranceExam = ({ id: applicantId }) => {
  const [timer, setTimer] = useState(3600);
  const [displayPrompt, setDisplayPrompt] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate()

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

  const onYesClicked = async () => {
    setDisplayPrompt(false);

    const score = calculateScore();
    const percentage = (score / questions.length) * 100;

    const scoreData = {
      applicant: applicantId,
      value: score,
      percentage,
    };

    const canSave = Object.values(scoreData).every(Boolean) && !isSubmitLoading;

    if (canSave) {
      await submitAnswers(scoreData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateAnswers()) {
      return;
    }

    setDisplayPrompt(true); 
  };

  const onNoClicked = () => {
    setDisplayPrompt(false);
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
    if (timer === 0) {
      setDisplayPrompt(false); 
      onYesClicked(); 
    }
  }, [timer]);

  useEffect(() => {
    if (isSubmitSuccess) {
      alert("Congratulations!!! \n You have submitted sucessfully, go to your dashboard")
    }

    navigate("/applicant/dashboard")
  }, [isSubmitSuccess, navigate])

  const errContent =
    (error?.data || submitError?.data) ?? "";

    

  let content;
  if (isLoading) content = <p>Loading....</p>;
  if (isError || isSubmitError) content = <p>{errContent}</p>;
  if (isSuccess) {
    content = (
      <article className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <header className="mb-4">
          <h1 className="text-3xl font-bold text-blue-600">Entrance Exam</h1>
          <div className={`text-xl mt-2 ${getColor()}`}>
            Time Remaining: {formatTime(timer)}
          </div>
        </header>

        <Questions
          setSelectedAnswers={setSelectedAnswers}
          selectedAnswers={selectedAnswers}
          questions={questions}
          // You can implement pagination logic in Questions component if not already done
        />
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        <button
          onClick={handleSubmit}
          className="mt-4 py-2 px-6 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>

        {displayPrompt && (
          <div className="mt-6 p-4 bg-gray-100 rounded-md">
            <p>Are you sure you want to submit?</p>
            <button
              onClick={onNoClicked}
              className="mr-4 py-1 px-4 bg-gray-300 text-black rounded"
            >
              No
            </button>
            <button
              onClick={onYesClicked}
              className="py-1 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Yes
            </button>
          </div>
        )}
      </article>
    );
  }
  return content;
};

export default EntranceExam;
