import React from 'react';
import style from './style.module.css';

const GameSquare = ({ question, players }) => {
  const randomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
  return (
    <div style={{ backgroundColor: randomColor() }} className={style.square}>
    {/* <div className={style.question}>{question.story}</div>
      <div className={style.answer}>Answer: {question.answer}</div> */}
      <div className={style.players}>
        {players.map((player, index) => (
          <div key={index} className={style.player}>
            {player}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameSquare;


