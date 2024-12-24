import { Navigate, Route, Routes } from "react-router-dom"
import Admin from "../views/Admin/Admin"
import ProtectedRoute from "./ProtectedRoute"
import AllStudents from "../views/Student/AllStudents/AllStudents"
import CreateStudent from "../views/Student/CreateStudent/CreateStudent"
import CreateTeacher from "../views/Teacher/CreateTeacher/CreateTeacher"
import AllTeacher from "../views/Teacher/AllTeachers/AllTeacher"
import AllSubjects from "../views/Subject/AllSubjects/AllSubjects"
import CreateSchedule from "../views/Schedule/CreateSchedule/CreateSchedule.jsx"
import AllClasses from "../views/Class/AllClasses/AllClasses.jsx"
import ClassInfo from "../views/Class/ClassInfo/ClassInfo.jsx"
import Dashboard from "../views/Dashboard/Dashboard.jsx"
import UpdateScore from "../components/UpdateScoreOfClass/UpdateScore.jsx"

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="student" element={<AllStudents />} />
        <Route path="student/create" element={<CreateStudent />} />
        <Route path="teacher" element={<AllTeacher />} />
        <Route path="teacher/create" element={<CreateTeacher />} />
        <Route path="classes/:classId" element={<ClassInfo />} />
        <Route path="classes" element={<AllClasses />} />
        <Route path="subject" element={<AllSubjects />} />
        <Route path="schedule" element={<CreateSchedule />} />
        <Route path="classes/:classId/score" element={<UpdateScore />} />
      </Route>
    </Routes>
  )
}

export default AdminRoutes
