import { create } from 'zustand'
import { socket } from './socket'
import { quations as initialQuations } from './quations';

export const useGameStore = create((set, get) => ({
    game: {
        players: [],
        board: [],
    },
    setGame: (game) => set({ game }),
    handleGameUpdate: (data) => {
        const game = get().game;
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
        const newPlayer = { id: socket.id, ...userData };
        set((state) => ({
          players: [...state.players, newPlayer],
        }));
    
        // שליחת רשימת השחקנים המעודכנת לכל הסוקטים המחוברים
        socket.emit('updatePlayerList', get().players);
      },
    
      handlePlayerListUpdate: (playerList) => {
        set({ players: playerList });
      },

}))

export const useUserStore = create((set, get) => {
    const initialState = {
      user: {
          name: 'sven',
          avatar: '🦌',
          socketId: '',
      },
      quations: initialQuations
    };
  
    console.log('Initial user store state:', initialState);
  
    return {
      ...initialState,
      setUser: (user) => set({ user }),
      joinGame: () => {
        const user = get().user;
        useGameStore.getState().joinGame(user);
      },
      setQuations: (quations) => set({ quations }),
      handleUpdateUser: (data) => {
          const user = get().user;
          set(state => ({
              user: {
                  ...state.user,
                  ...data
              }
          }));
          socket.emit('updateUser', data);
          socket.on('updateUser', (data) => {
              const game = get().game;
              game.friends.push(data);
          });
      },
      
    }
  });
  
