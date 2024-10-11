import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Admin from '../views/Admin/Admin'
import ProtectedRoute from './ProtectedRoute'
import AllStudents from '../views/Student/AllStudents/AllStudents'
import CreateStudent from "../views/Student/CreateStudent/CreateStudent"

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<ProtectedRoute><Admin /></ProtectedRoute>} >
        <Route index element={<Navigate to="student" />} />
        <Route path="student" element={<AllStudents />} />
        <Route path="student/create" element={<CreateStudent />} />
      </Route>
    </Routes>
  )
}

export default AdminRoutes
