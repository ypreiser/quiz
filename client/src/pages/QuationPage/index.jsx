import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store';
import UserView from '../../components/UserView';
import style from './style.module.css';

export default function QuationPage() {
  const { userQuations, setUserQuations } = useUserStore((state) => ({
    userQuations: state.user.userQuations,
    setUserQuations: state.user.setUserQuations,
  }));

  const [quation, setQuation] = useState({});
  const [answers, setAnswers] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const user = useUserStore(state => state.user);

  console.log('user:', user);


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
    <div className={style.container}>
      <button onClick={() => nav('/game')}>go see everybody</button>
      <p dir="rtl">         למי זה קרה??
      </p>
      {userQuations.length > 0 ? (
        <div className={style['question_container']}>
          <div className={style.story}>{quation.story}</div>
          <div>
            {answers.map((answer, index) => (
              <div key={index} className={style.answer} onClick={checkAnswer}>
                {answer}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>No more quations!</div>
      )}
            <UserView name={user.name} avatar={user.avatar} />

    </div>
  );
}
