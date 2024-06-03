import React, { useState } from 'react';
import { useUserStore } from '../../store';
import { useNavigate } from 'react-router-dom';

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
    nav('/quation');
  };

  return (
    <div>
      <form onSubmit={handleNewPlayer}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          name="Avatar"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        >
          <option value="chooseAvatar" disabled>Choose an avatar</option>
          <option value="🦌">🦌</option>
          <option value="🦁">🦁</option>
          <option value="😺">😺</option>
          <option value="🐥">🐥</option>
          <option value="🐦">🐦</option>
          <option value="🐧">🐧</option>
        </select>

        <button type="submit">Add</button>
      </form>
    </div>
  );
}