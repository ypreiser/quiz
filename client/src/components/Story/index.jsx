import React from 'react'
import style from './style.module.css';


export default function Story({story}) {
  return (
    <div className={style.story}>
      {story}
    </div>
  )
}
