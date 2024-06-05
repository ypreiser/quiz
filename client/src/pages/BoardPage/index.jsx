import React, { useState, useEffect } from 'react';
import GameSquare from '../../components/GameSquare';
import { useNavigate } from 'react-router-dom';
import { useGameStore, useUserStore } from '../../store';
import style from './style.module.css';
import Winning from '../../components/Winning';
import WinStairs from '../../components/WinStairs';

export default function BoardPage() {
  const questions = useUserStore(state => state.questions);
  const players = useGameStore(state => state.game.players);
  const [playersOnSquares, setPlayersOnSquares] = useState([]);
  const win = useGameStore(state => state.win);
  const setWin = useGameStore(state => state.setWin);
  const { userQuestions } = useUserStore((state) => ({
    userQuestions: state.user.userQuestions,
  }));

  const nav = useNavigate();

  useEffect(() => {
    if (!questions || !players) return;

    const tempPlayersOnSquares = Array(questions.length + 1).fill(null).map(() => []);

    players.forEach(player => {
      const questionsAnswered = questions.length - player.userQuestions.length;
      if (questionsAnswered <= questions.length) {
        tempPlayersOnSquares[questions.length - questionsAnswered].push(player.id);
      }
    });

    setPlayersOnSquares(tempPlayersOnSquares);
  }, [players, questions]);

  useEffect(() => {
    if (userQuestions.length == 0) {
      setWin(true)
    }
  }, [userQuestions])
  return (
    <div className={style.container}>
      <button onClick={() => nav('/question')}>Back to Question</button>
      <div className={style.board}>
        {questions && questions.map((question, index) => (
          <div key={index} className={style.gameSquare} style={{ animationDelay: `${index * 0.1}s` }}>
            <GameSquare question={index} playersOnSquare={playersOnSquares[index] || []} />
            {index === 0 && <div className={style.train}>👑</div>}
          </div>
        ))}
      </div>
      <WinStairs />
      {win && <Winning />}
    </div>
  );
}
