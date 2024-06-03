import React, { useEffect, useState } from 'react';
import style from './style.module.css';
import { useGameStore } from '../../store';
import UserView from '../UserView';

const GameSquare = ({ playersOnSquare }) => {
  const players = useGameStore(state => state.game.players);
  const [playersOnSquareState, setPlayersOnSquareState] = useState([]);

  useEffect(() => {
    if (!players) return;

    if (playersOnSquare.length > 0) {
      const updatedPlayers = playersOnSquare.map(playerId => {
        const player = players.find(p => p.id === playerId);
        return player ? { name: player.name, avatar: player.avatar } : null;
      }).filter(player => player !== null);
      console.log({playersOnSquare})
      
      setPlayersOnSquareState(updatedPlayers);
    }
  }, [players, playersOnSquare]);

  const randomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div style={{ backgroundColor: randomColor() }} className={style.square}>
      {playersOnSquareState.map((player, index) => (
        <div key={index} >
          <UserView name={player.name} avatar={player.avatar}/>   
        </div>
      ))}
                {/* <UserView name={"לא עובד "} avatar={"🦊"}/>    */}

    </div>
  );
};

export default GameSquare;