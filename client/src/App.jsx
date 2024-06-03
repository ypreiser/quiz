import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Welcome from './pages/Welcome'
import BoardPage from './pages/BoardPage'
import QuationPage from './pages/QuationPage'
import PlayerDetails from './pages/PlayerDetails'
import { useGameStore, useUserStore } from "./store";


export default function App() {
  const router = createBrowserRouter([
    {path: '/', element: <Welcome /> },
    { path: '/myname', element: <PlayerDetails /> },
    { path: '/game', element: <BoardPage /> },
    { path: '/quation', element: <QuationPage /> },
  ])

  const handleGameUpdate = useGameStore(state => state.handleGameUpdate);
  const handleUpdateUser = useUserStore(state => state.handleUpdateUser);


  useEffect(() => {
    handleGameUpdate();
    handleUpdateUser();
  }, [handleGameUpdate, handleUpdateUser]);

  return (
    <RouterProvider router={router} />
  )
}
