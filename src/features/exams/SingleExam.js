import { useEffect, useState } from "react";
import { useGetExamsQuery } from "./examsApiSlice";
import Questions from "../../components/Questions";
import { useAddNewScoreMutation } from "../scores/scoresApiSlice";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const SingleExam = ({ exam_id, class_id, subject_id }) => {
  const [submitScore, { isLoading, isSuccess }] = useAddNewScoreMutation();
  const { user_id } = useAuth();
  const navigate = useNavigate();
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [displayPrompt, setDisplayPrompt] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { questions, time_allowed } = useGetExamsQuery(
    { class_id, subject_id },
    {
      selectFromResult: ({ data }) => ({
        questions: data?.entities[exam_id]?.questions,
        time_allowed: data?.entities[exam_id]?.time_allowed,
      }),
    }
  );
  const [timer, setTimer] = useState(time_allowed * 60);

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
        `You have not answered the following questions: ${unanswered.join(
          ", "
        )}`
      );
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateAnswers()) {
      return;
    }

    setDisplayPrompt(true); 
  };

  const onYesClicked = async () => {
    setDisplayPrompt(false);

    const score = calculateScore();

    const scoreData = {
      value: score,
      score_type: "Exam",
      subject: subject_id,
      student: user_id,
    };

    const canSave = Object.values(scoreData).every(Boolean) && !isLoading;

    if (canSave) {
      await submitScore(scoreData);
    }
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
    if (isSuccess) {
      alert("You have successfully answered your exam");
      navigate("/student/dashboard");
    }
  }, [isSuccess, navigate]);

  let content;

  if (questions && time_allowed) {
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
  } else content = null;

  return content;
};
export default SingleExam;
