import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import Admin from "../../views/Admin/Admin";
import CreateStudent from "../../views/Student/CreateStudent/CreateStudent";

export default {
  path: "admin",
  element: (
    // <ProtectedRoute>
    <Admin />
    // </ProtectedRoute>
  ),
  children: [
    {
      path: "student",
      element: (
        // <ProtectedRoute>
        <CreateStudent />
        // </ProtectedRoute>
      ),
    },
  ],
};
