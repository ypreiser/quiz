import React from 'react';
import style from './style.module.css';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const nav = useNavigate();
  return (
    <div className={style.welcome} onClick={() => nav('/myname')}>
      <div className={style.bg}></div>
      <div className={`${style.bg} ${style.bg2}`}></div>
      <div className={`${style.bg} ${style.bg3}`}></div>
      <div className={style.content}>
       <h1>Welcome</h1> 
      </div>
    </div>
  );
}
