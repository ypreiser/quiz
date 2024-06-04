import React from 'react'
import style from './style.module.css';


export default function Answer({ answer }) {
  return (
        <div className={style.answer}>
            {answer}
    </div>
  )
}
