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
  const [error, setError] = useState('');

  const handleNewPlayer = (e) => {
    e.preventDefault();

    // Check if an avatar has been selected
    if (avatar === 'chooseAvatar') {
      setError('Please choose an avatar');
      return;
    }

    // Update user information in the store
    setUser({ name, avatar });
    joinGame();

    // Navigate to the question page
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
            onChange={(e) => {
              setAvatar(e.target.value);
              setError(''); // Clear error when a new selection is made
            }}
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
          {error && <div className={style.error}>{error}</div>}
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}
