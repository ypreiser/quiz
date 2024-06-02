import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store';

export default function QuationPage() {
  const quations = useUserStore(state => state.quations)
  const setQuations = useUserStore(state => state.setQuations);

  const [quation, setQuation] = useState({});
  const [answers, setAnswers] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (quations.length > 0) {
      setQuation(quations[randomIndex()]);
      setAnswers(quations.map(q => q.answer));
    }
  }, [quations]);

  function randomIndex() {
    return Math.floor(Math.random() * quations.length);
  }

  const checkAnswer = (e) => {
    if (e.target.innerText === quation.answer) {
      setIsCorrect(true);
      const newQuations = quations.filter(q => q.id !== quation.id);
      setQuations(newQuations);
    } else {
      setIsCorrect(false);
      setQuation(quations[randomIndex()]);
    }
  };
  const nav = useNavigate();

  return (
    <div>
            <button onClick={()=>nav('/game')}>go see everybody</button>

      {quations.length > 0 ? (
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
      {isCorrect && <div>Correct!</div>}
    </div>
  );
}
