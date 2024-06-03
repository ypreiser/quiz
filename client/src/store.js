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
    };

    console.log('Initial user store state:', initialState);


    socket.on('connect', () => {
        set(state => ({
            user: {
                ...state.user,
                socketId: socket.id,
            }
        }));
        joinGame(); // Joining the game after updating the socketId
    });
    
    const joinGame = () => {
        console.log('Joining game...');
        const user = get().user;
        console.log("get user:", user);
        useGameStore.getState().joinGame(user);
        connectToSocket();
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
    const handlePlayerListUpdate = (playerList) => {
        // set(state => ({
        //     game: {
        //         ...state.game,
        //         players: playerList,
        //     }
        // }));
    };


    return {
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
            console.log('joinGame', userData);
            socket.emit('joinGame', userData);
            // לאחר שליחת הפרטים של היוזר, בקש את רשימת השחקנים המעודכנת מהשרת
            socket.on('updatePlayerList', (playerList) => {
                console.log('updatePlayerList', playerList);
                // set(state => ({
                //     game: {
                //         ...state.game,
                //         players: playerList,
                //     }
                // }));
            });
        },
    };
});
