import React, { useState, useEffect } from 'react';
import GameSquare from '../../components/GameSquare';
import { useNavigate } from 'react-router-dom';
import { useGameStore, useUserStore } from '../../store';
import style from './style.module.css';

export default function BoardPage() {
  const quations = useUserStore(state => state.quations);
  const players = useGameStore(state => state.game.players);
  const user = useUserStore(state => state.user);
  const [playersOnSquares, setPlayersOnSquares] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    if (!quations || !players) return;

    // Initialize an array of arrays, one for each question.
    const tempPlayersOnSquares = Array(quations.length + 1).fill(null).map(() => []);

    players.forEach(player => {
      const questionsAnswered = quations.length - player.userQuations.length;
      if (questionsAnswered <= quations.length) {
        tempPlayersOnSquares[questionsAnswered].push(player.id);
      }
    });

    setPlayersOnSquares(tempPlayersOnSquares);
  }, [players, quations, user]);

  return (
    <div>
      <button onClick={() => nav('/quation')}>back to quation</button>
      <div className={style.board}>
        {quations && quations.map((question, index) => (
          <div key={index} className={style.gameSquare}>
            <GameSquare question={question} playersOnSquare={playersOnSquares[index] || []} />
          </div>
        ))}
      </div>
    </div>
  );
}