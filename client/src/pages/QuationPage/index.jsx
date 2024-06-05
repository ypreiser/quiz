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

  const [quation, setQuation] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answerPositions, setAnswerPositions] = useState([]);
  const user = useUserStore(state => state.user);
  const players = useGameStore(state => state.game.players);
  const setGame = useGameStore(state => state.setGame);
  const game = useGameStore(state => state.game);

  useEffect(() => {
    if (userQuations.length > 0) {
      const currentQuation = userQuations[randomIndex(userQuations)];
      setQuation(currentQuation);
      const shuffledAnswers = shuffleArray(userQuations.map(q => q.answer));
      setAnswers(shuffledAnswers);
      setAnswerPositions(generateRandomPositions(shuffledAnswers.length));
    }
  }, [userQuations]);

  function randomIndex(quations) {
    return Math.floor(Math.random() * quations.length);
  }

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function generateRandomPositions(count) {
    const positions = [];
    const containerWidth = window.innerWidth - 40; // Subtract some padding
    const containerHeight = window.innerHeight - 40; // Subtract some padding
    const answerSize = Math.min(containerWidth, containerHeight) / (count + 1); // Dynamically size answers based on count and viewport

    for (let i = 0; i < count; i++) {
      const top = Math.random() * (containerHeight - answerSize);
      const left = Math.random() * (containerWidth - answerSize);
      positions.push({ top, left, size: answerSize });
    }

    return positions;
  }

  function checkAnswer(e) {
    if (quation && quation.answer && e.target.innerText === quation.answer) {
      const newUserQuations = userQuations.filter(q => q.id !== quation.id);
      setUserQuations(newUserQuations);
      const updatedPlayers = (players || []).map(p => {
        if (user && (p.socketId === user.socketId || p.id === user.socketId)) {
          return { ...p, userQuations: newUserQuations };
        }
        return p;
      });
      if (game) {
        setGame({ game: { ...game, players: updatedPlayers } });
      }
      handleGameUpdate(updatedPlayers);
    } else if (userQuations.length > 0) {
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
        <div className={style.questionContainer}>
          <div className={style.storyContainer}>
            {quation && <Story story={quation.story} />}
          </div>
          <div className={style.answersContainer}>
            {answers.map((answer, index) => (
              <span
                key={index}
                className={style.answer}
                style={{
                  top: `${answerPositions[index].top}px`,
                  left: `${answerPositions[index].left}px`,
                  width: `${answerPositions[index].size}px`,
                  height: `${answerPositions[index].size}px`,
                }}
                onClick={checkAnswer}
              >
                {answer} 
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div>No questions available.</div>
      )}
    </div>
  );
}