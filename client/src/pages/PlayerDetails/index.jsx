import React from 'react'
  import { useUserStore } from '../../store'
import { useNavigate } from 'react-router-dom'

export default function PlayerDetails() {

  const nav = useNavigate()
  const handleUserUpdate = useUserStore(state => state.handleUserUpdate)
  
  const handleNewPlayer = (e) => {
    e.preventDefault()
    const name = e.target.name.value
    // handleUserUpdate({ name: name })
    nav('/quation')
  }

  return (
    <div>
      <form onSubmit={handleNewPlayer}>
        <input type="text" name="name" />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}
