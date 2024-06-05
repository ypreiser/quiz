import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore, useGameStore } from '../../store';
import style from './style.module.css';
import Story from '../../components/Story';
import Answer from '../../components/Answer';

export default function QuationPage() {
  const handleGameUpdate = useGameStore(state => state.handleGameUpdate);
  const { userQuations, setUserQuations } = useUserStore((state) => ({
    userQuations: state.user.userQuations,
    setUserQuations: state.user.setUserQuations,
  }));

  const [quation, setQuation] = useState({});
  const [answers, setAnswers] = useState([]);
  const user = useUserStore(state => state.user);
  const players = useGameStore(state => state.game.players);
  const setGame = useGameStore(state => state.setGame);
  const game = useGameStore(state => state.game);
  const setWin = useGameStore(state => state.setWin);
  // console.log('players:', players);

  // console.log('user:', user);


  useEffect(() => {
    if (userQuations.length > 0) {
      const currentQuation = userQuations[randomIndex(userQuations)];
      setQuation(currentQuation);
      setAnswers(userQuations.map(q => q.answer));
    }
    if (userQuations.length === 0) {
      setWin(true);
    }
  }, [userQuations]);

  function randomIndex(quations) {
    return Math.floor(Math.random() * quations.length);
  }

  const checkAnswer = (e) => {
    if (e.target.innerText === quation.answer) {
      const newUserQuations = userQuations.filter(q => q.id !== quation.id);
      setUserQuations(newUserQuations);
      const updatedPlayers = players.map(p => {
        if (p.socketId === user.socketId || p.id === user.socketId) {
          return { ...p, userQuations: newUserQuations };
        }
        return p;
      });
      console.log({ updatedPlayers });
      setGame({ game: { ...game, players: updatedPlayers } }); // עדכון הרשימה המקומית
      handleGameUpdate(updatedPlayers); // שליחת הרשימה המעודכנת לשרת
    } else {
      setQuation(userQuations[randomIndex(userQuations)]);
    }
  };

  const nav = useNavigate();

  return (
    <div className={style.container}>
      <div className={style.bg}></div>
      <div className={`${style.bg} ${style.bg2}`}></div>
      <div className={`${style.bg} ${style.bg3}`}></div>
      <button onClick={() => nav('/game')}>go see everybody</button>
      {userQuations.length > 0 ? (
        <div>
          <div className={style.content}><Story story={quation.story} /></div>
          <div className={style.answers}>
            {answers.map((answer, index) => (
              <div key={index} onClick={checkAnswer}>
                <Answer answer={answer} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>No more quations!</div>
      )}

    </div>
  );
}
