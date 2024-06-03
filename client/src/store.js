import { create } from 'zustand';
import { socket, connectToSocket } from './socket';
import { quations as initialQuations, quations } from './quations';

export const useUserStore = create((set, get) => {
    const initialState = {
        user: {
            name: 'sven',
            avatar: '🦌',
            socketId: '',
            userQuations: [...(initialQuations || [])],
            setUserQuations: (userQuations) => set(state => ({
                user: {
                    ...state.user,
                    userQuations,
                },
            }))
        },
        quations: initialQuations || [],
        setUser: (user) => set(state => ({
            user: {
                ...state.user,
                ...user,
            }
        }))
    };

    console.log('Initial user store state:', initialState);


   

    const joinGame = () => {
        const user = get().user;
        const setUser = (user) => set(state => ({
            user: {
                ...state.user,
                ...user,
            }
        }));
        connectToSocket();
        socket.on('connect', () => {
            console.log('Connected to socket');
            setUser({ socketId: socket.id });
        });
                
        console.log("get user:", user);
        useGameStore.getState().joinGame(user);
        
    };

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
        },
    };
});

export const useGameStore = create((set, get) => {

    return {
        game: {
            players: [],
            board: [],
        },
        setGame: (game) => set({ game }),
        handleGameUpdate: (data) => {
            socket.emit('updatePlayerList', data);
            socket.on('updatePlayerList', (playerList) => {
                console.log("coming playerList:", playerList);
                set(state => ({
                    game: {
                        ...state.game,
                        players: playerList,
                    }
                }));
            });
        },
        joinGame: (userData) => {
            console.log('joinGame', userData);
            socket.emit('joinGame', userData);
            // לאחר שליחת הפרטים של היוזר, בקש את רשימת השחקנים המעודכנת מהשרת
            socket.on('joinGame', (playerList) => {
                console.log('joinGame', playerList);
                set(state => ({
                    game: {
                        ...state.game,
                        players: playerList,
                    }
                }));
            });
        },
    };
});
