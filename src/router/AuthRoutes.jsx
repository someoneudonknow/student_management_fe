import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthView from "../views/Auth/Auth.jsx"

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<AuthView />} index />
    </Routes>
  )
}

export default AuthRoutes
