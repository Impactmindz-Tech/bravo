import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import React from 'react'
import { getLocalStorage } from '../utils/LocalStorageUtills'

const AuthAuthenticat = () => {
    const admin = getLocalStorage("token")
  return (
    admin ? <Outlet /> : <Navigate to="/login" />
  )
}

export default AuthAuthenticat