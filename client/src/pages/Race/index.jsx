import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore, useUserStore } from '../../store';
import PlayerTrack from '../../components/PlayerTrack';
import style from './style.module.css';
import Winning from '../../components/Winning';
import WinStairs from '../../components/WinStairs';

export default function Race() {
    const questions = useUserStore(state => state.questions);
    const players = useGameStore(state => state.game.players);
    const [playersProgress, setPlayersProgress] = useState([]);
    const win = useGameStore(state => state.win);
    const winners = useGameStore(state => state.game.winners || []);
    const user = useUserStore(state => state.user);

    const addWinner = useGameStore(state => state.game.addWinner)

    const { userQuestions } = useUserStore((state) => ({
        userQuestions: state.user.userQuestions,
    }));

    const nav = useNavigate();

    useEffect(() => {
        if (!questions || !players) return;

        const updatePlayerProgress = (players) => {
            const tempPlayersProgress = players.map(player => {
                const questionsAnswered = questions.length - (player.userQuestions?.length || 0);
                return {
                    id: player.id,
                    name: player.name,
                    avatar: player.avatar,
                    progress: questionsAnswered,
                };
            });

            setPlayersProgress(tempPlayersProgress);
        };

        updatePlayerProgress(players);

    }, [players, questions]);

    useEffect(() => {
        if (userQuestions.length === 0) {
            const newWinners = [...winners, user];
            addWinner(newWinners);
        }
    }, [userQuestions, win, winners, addWinner, user]);

    return (
        <div className={style.container}>
            <div className="b"></div>
            <div className="bg bg2"></div>
            <div className="bg bg3"></div>
            <button onClick={() => nav('/question')}>Back to Question</button>
            <div className={style.tracks}>
                {questions && playersProgress.map((player) => (
                    <PlayerTrack
                        key={player.id}
                        player={player}
                        questionsLength={questions.length}
                        progress={player.progress}
                    />
                ))}
            </div>
            <WinStairs />
            {win && <Winning />}
        </div>
    );
}
