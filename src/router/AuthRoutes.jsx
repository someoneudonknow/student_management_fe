import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthView from "../views/Auth/Auth.jsx"
import ForgotPassword from '../views/ForgotPassword/ForgotPassword.jsx'
import ResetPassword from '../views/ResetPassword/ResetPassword.jsx'

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<AuthView />} index />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  )
}

export default AuthRoutes
