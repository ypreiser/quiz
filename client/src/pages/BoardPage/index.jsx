import React, { useState, useEffect } from 'react';
import GameSquare from '../../components/GameSquare';
import { useNavigate } from 'react-router-dom';
import { useGameStore, useUserStore } from '../../store';
import style from './style.module.css';

export default function BoardPage() {
  const { quations } = useUserStore(state => state);
  const players = useGameStore(state => state.game.players); // קבלת רשימת השחקנים
  const [playersOnSquares, setPlayersOnSquares] = useState([]);

  useEffect(() => {
    if (!quations || players) return; 

    const tempPlayersOnSquares = Array(quations.length).fill('').map(() => []);

    for (let i = 0; i < players.length; i++) {
      const questionsLeft = players[i].userQuations.length;
      if (tempPlayersOnSquares[questionsLeft]) {
        tempPlayersOnSquares[questionsLeft].push(players[i].name);
      } else {
        tempPlayersOnSquares[questionsLeft] = [players[i].name];
      }
    }

    setPlayersOnSquares(tempPlayersOnSquares);
  }, [players, quations]);

  const nav = useNavigate();

  return (
    <div>
      <button onClick={() => nav('/quation')}>back to quation</button>
      {quations &&quations.map((question, index) => (
        <div key={index} className={style.gameSquare}>
          <GameSquare question={question} players={playersOnSquares[index] || []} />
        </div>
      ))}
    </div>
  );
}
