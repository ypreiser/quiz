import React from 'react';
import style from './style.module.css';
import UserView from '../UserView';

function PlayerTrack({ player, questionsLength, progress }) {
  return (
    <div className={style.track}>
      <div className={style.player} style={{ left: `${(progress / questionsLength) * 100}%` }}>
      <UserView name={player.name} avatar={player.avatar}/>
      </div>
    </div>
  );
}

export default PlayerTrack;
