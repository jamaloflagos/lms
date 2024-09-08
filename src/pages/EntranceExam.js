import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Questions from '../components/Questions';
import { useCustomQuery } from '../hooks/useCustomQuery';

const EntranceExam = () => {
  const [submitted, setSubmitted] = useState(false);
  const [timer, setTimer] = useState(3600);
  const { applicantId } = useParams();
  console.log(applicantId)
  const { data: score, isLoading: scoreLoading, isError: scoreError } = useCustomQuery(['e_score', applicantId],  `http://127.0.0.1:8000/entrance-exam-score/${applicantId}`);
  const { data: questions, isLoading: questionLoading, isError: questionError } = useCustomQuery(['questions', ''], 'http://127.0.0.1:8000/entrance-exam-questions');

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer, score]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getColor = () => {
    if (timer < 600) { // less than 10 minutes
      return 'red';
    }
    return 'green';
  };

  if (questionLoading || scoreLoading) return <div>Loading...</div>;
  if (questionError || scoreError) return <div>Error fetching questions due to network error</div>
  if (score && score.value) return <div>You can only take the entrance exam once</div>
  if (submitted) return <div>You have successfully anser your entrance exam</div>

  return (
    <div>
      <div style={{ color: getColor() }}>{formatTime(timer)}</div>
      <Questions applicantId={applicantId} url={'http://127.0.0.1:8000/entrance-exam-score/'} questions={questions} context={'entrance-exam'} setSubmitted={setSubmitted}/>
    </div>
  );
};

export default EntranceExam;
