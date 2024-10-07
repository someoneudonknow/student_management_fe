import { Navigate } from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import Admin from "../../views/Admin/Admin";
import CreateStudent from "../../views/Student/CreateStudent/CreateStudent";

export default {
  path: "admin",
  element: (
    <ProtectedRoute>
      <Admin />
    </ProtectedRoute>
  ),
  children: [
    { index: true, element: <Navigate to="student" /> },
    {
      path: "student",
      element: (
        <CreateStudent />
      ),
    },
  ],
};
