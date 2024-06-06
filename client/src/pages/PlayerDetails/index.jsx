import React, { useState } from 'react';
import { useUserStore } from '../../store';
import { useNavigate } from 'react-router-dom';
import style from './style.module.css';


export default function PlayerDetails() {
  const nav = useNavigate();
  const setUser = useUserStore(state => state.setUser);
  const joinGame = useUserStore(state => state.joinGame);

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('chooseAvatar');

  const handleNewPlayer = (e) => {
    e.preventDefault();

    // עדכון המידע של המשתמש בחנות
    setUser({ name, avatar });
    joinGame();
    // console.log('New player:', name);

    // ניווט לדף השאלות
    nav('/question');
  };

  return (
    <div className={style.playerDetails}>
          <div className="b"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      <div className={style.content}>
        <form onSubmit={handleNewPlayer} className={style.contactUs}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <select
            name="Avatar"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            required
          >
            <option value="chooseAvatar" disabled>Choose an avatar</option>
            <option value="🦌">🦌</option>
            <option value="🦁">🦁</option>
            <option value="😺">😺</option>
            <option value="🐥">🐥</option>
            <option value="🐦">🐦</option>
            <option value="🐧">🐧</option>
            <option value="🐰">🐰 </option>
            <option value="🦊">🦊</option>
            <option value="🐻">🐻 </option>
            <option value="🐼">🐼</option>
            <option value="🐸">🐸 </option>
            <option value="🐵">🐵</option>
            <option value="🐨">🐨</option>
            <option value="🐯">🐯</option>
            <option value="🐮">🐮 </option>
          </select>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}