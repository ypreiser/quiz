import { create } from 'zustand';
import { socket, connectToSocket } from './socket';
import { questions as initialQuestions, questions } from './questions';

export const useUserStore = create((set, get) => {
    const initialState = {
        user: {
            name: 'sven',
            avatar: '🦌',
            socketId: '',
            userQuestions: [...(initialQuestions || [])],
            setUserQuestions: (userQuestions) => set(state => ({
                user: {
                    ...state.user,
                    userQuestions,
                },
            }))
        },
        questions: initialQuestions || [],
        setUser: (user) => set(state => ({
            user: {
                ...state.user,
                ...user,
            }
        }))
    };

    // console.log('Initial user store state:', initialState);


   

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
            // console.log('Connected to socket');
            setUser({ socketId: socket.id });
        });
                
        // console.log("get user:", user);
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
        setQuestions: (questions) => set({ questions }),
        setUserQuestions: (userQuestions) => set({ userQuestions }),
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
        win: false,
        setWin: (win) => set({ win }),
        game: {
            players: [],
            winners:[],
            addWinner:  (winners) => {
                socket.emit('addWinner', winners);
                socket.on('addWinner', (winners) => {
                    set(state => ({
                        game: {
                            ...state.game,
                            winners: winners,
                        }
                    }));
                });
            },
            removeWinner: (winnerToRemove) => set((state) => ({
                game: {
                    ...state.game,
                    winners: state.game.winners.filter(winner => winner !== winnerToRemove) // מסנן מנצח
                }
            }))          
        },
        setGame: (game) => set({ game }),
        handleGameUpdate: (data) => {
            socket.emit('updatePlayerList', data);
            socket.on('updatePlayerList', (playerList) => {
                // console.log("coming playerList:", playerList);
                set(state => ({
                    game: {
                        ...state.game,
                        players: playerList,
                    }
                }));
            });
        },
        joinGame: (userData) => {
            // console.log('joinGame', userData);
            socket.emit('joinGame', userData);
            // לאחר שליחת הפרטים של היוזר, בקש את רשימת השחקנים המעודכנת מהשרת
            socket.on('joinGame', (playerList) => {
                // console.log('joinGame', playerList);
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
