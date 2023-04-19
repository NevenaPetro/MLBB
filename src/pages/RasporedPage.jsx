import React from 'react'
import { useAuthStatus } from '../hooks/useAuthStatus'

function RasporedPage() {
  const { loggedIn, checkingStatus } = useAuthStatus();
  return (
    <div>
      <h2>Raspored</h2>
      

    </div>
  )
}

export default RasporedPage
