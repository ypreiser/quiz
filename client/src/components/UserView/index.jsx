import React from 'react'
import style from './style.module.css';


export default function UserView({ name, avatar }) {

  return (
        <div className={style.userView}>
          <div className={style.avatar}>  {avatar}</div>
            <div className={style.name}>{name}</div> 
    </div>
  )
}
