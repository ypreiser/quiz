import React from 'react'
import style from './style.module.css'
import { useNavigate } from 'react-router-dom'

export default function Welcome() {
  const nav = useNavigate()
  return (
    <div className={style.welcome} onClick={()=>nav('/myname')} >
      hi
    </div>
  )
}
