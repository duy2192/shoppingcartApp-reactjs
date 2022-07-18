import { useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/Auth/services/authSlice';
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';


export function PrivateRoute() {
  
    const isLoggedIn=useAppSelector(selectCurrentUser)
    if(!isLoggedIn) return <Navigate replace to="/auth/login" />
    return (
        <Outlet/>
  )
}