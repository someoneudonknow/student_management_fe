import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Admin from '../views/Admin/Admin'
import CreateStudent from '../views/Student/CreateStudent/CreateStudent'
import ProtectedRoute from './ProtectedRoute'

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<ProtectedRoute><Admin /></ProtectedRoute>} >
        <Route index element={<Navigate to="student" />} />
        <Route path="student" element={<CreateStudent />} />
      </Route>
    </Routes>
  )
}

export default AdminRoutes
