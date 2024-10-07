import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Admin from '../views/Admin/Admin'
import CreateStudent from '../views/Student/CreateStudent/CreateStudent'

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<Admin />} >
        <Route index element={<Navigate to="student" />} />
        <Route path="student" element={<CreateStudent />} />
      </Route>
    </Routes>
  )
}

export default AdminRoutes
