import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Welcome from './pages/Welcome'
import BoardPage from './pages/BoardPage'
import QuestionPage from './pages/QuestionPage'
import PlayerDetails from './pages/PlayerDetails'
import { useGameStore, useUserStore } from "./store";
import Example from './pages/Example'
import Race from './pages/Race'


export default function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Welcome /> },
    { path: '/myname', element: <PlayerDetails /> },
    // { path: '/game', element: <BoardPage /> },
    { path: '/game', element: <Race /> },
    { path: '/question', element: <QuestionPage /> },
    { path: '/try', element: <Example /> }
  ])

  const handleGameUpdate = useGameStore(state => state.handleGameUpdate);
  const handleUpdateUser = useUserStore(state => state.handleUpdateUser);
  const handleAddWinner = useGameStore(state => state.handleAddWinner)

  useEffect(() => {
    handleGameUpdate();
    handleUpdateUser();
    handleAddWinner()
  }, [handleGameUpdate, handleUpdateUser, handleAddWinner]);

  return (
    <RouterProvider router={router} />
  )
}

