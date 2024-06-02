import React from 'react'
import style from './style.module.css'

export default function GameSquare() {

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
      
    </div>
  )
}
