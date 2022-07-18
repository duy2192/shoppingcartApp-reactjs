import { useAppSelector } from 'app/hooks'
import { NotFound } from 'components/Common'
import { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import { selectCurrentUser } from './services/authSlice'

export interface IAuthProps {

}
export default function AuthFeature() {
  const user=useAppSelector(selectCurrentUser)
  const navigate=useNavigate()
  useEffect(()=>{
    if(user) navigate("/product")
  },[user])
  return (
    <Routes>
          <Route path="/" element={<Navigate to="login" />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="*" element={<NotFound />}></Route>
    </Routes>
  )
}
