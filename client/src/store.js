import { create } from 'zustand';
import { socket } from './socket';
import { quations as initialQuations } from './quations';

export const useUserStore = create((set, get) => {
    const initialState = {
        user: {
            name: 'sven',
            avatar: '🦌',
            socketId: '',
        },
        quations: initialQuations || [],
        userQuations: [...(initialQuations || [])],
    };

    console.log('Initial user store state:', initialState);

    const joinGame = () => {
        const user = get().user;
        useGameStore.getState().joinGame(user);
    };

    socket.on('connect', () => {
        set(state => ({
            user: {
                ...state.user,
                socketId: socket.id,
            }
        }));
        joinGame(); // הצטרפות למשחק לאחר עדכון ה-socketId
    });

    return {
        ...initialState,
        setUser: (user) => set(state => ({
            user: {
                ...state.user,
                ...user,
            }
        })),
        joinGame,
        setQuations: (quations) => set({ quations }),
        setUserQuations: (userQuations) => set({ userQuations }),
        handleUpdateUser: (data) => {
            set(state => ({
                user: {
                    ...state.user,
                    ...data,
                }
            }));
            socket.emit('updateUser', data);
            socket.on('updateUser', (data) => {
                const game = get().game;
                game.friends.push(data);
            });
        },
    };
});

export const useGameStore = create((set, get) => ({
    game: {
        players: [],
        board: [],
    },
    setGame: (game) => set({ game }),
    handleGameUpdate: (data) => {
        socket.emit('move', data);
        socket.on('gameUpdate', (data) => {
            set(state => ({
                game: {
                    ...state.game,
                    ...data
                }
            }));
        });
    },
    joinGame: (userData) => {
        socket.emit('joinGame', userData);
        socket.on('updatePlayerList', (playerList) => {
            set(state => ({
                game: {
                    ...state.game,
                    players: playerList,
                }
            }));
        });
    },
    handlePlayerListUpdate: (playerList) => {
        set(state => ({
            game: {
                ...state.game,
                players: playerList,
            }
        }));
    },
}));
