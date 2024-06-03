import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store';

export default function QuationPage() {
  const { userQuations, setUserQuations } = useUserStore((state) => ({
    userQuations: state.userQuations,
    setUserQuations: state.setUserQuations,
  }));
  
  const [quation, setQuation] = useState({});
  const [answers, setAnswers] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (userQuations.length > 0) {
      const currentQuation = userQuations[randomIndex(userQuations)];
      setQuation(currentQuation);
      setAnswers(userQuations.map(q => q.answer));
    }
  }, [userQuations]);

  function randomIndex(quations) {
    return Math.floor(Math.random() * quations.length);
  }

  const checkAnswer = (e) => {
    if (e.target.innerText === quation.answer) {
      setIsCorrect(true);
      const newUserQuations = userQuations.filter(q => q.id !== quation.id);
      setUserQuations(newUserQuations);
    } else {
      setIsCorrect(false);
      setQuation(userQuations[randomIndex(userQuations)]);
    }
  };

  const nav = useNavigate();

  return (
    <div>
      <button onClick={() => nav('/game')}>go see everybody</button>

      {userQuations.length > 0 ? (
        <>
          <div>{quation.story}</div>
          <div>
            {answers.map((answer, index) => (
              <div key={index} onClick={checkAnswer}>
                {answer}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>No more quations!</div>
      )}
    </div>
  );
}
