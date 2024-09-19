import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import Admin from "../../views/Admin/Admin";

export default {
  path: "admin",
  element: (
    <ProtectedRoute>
      <Admin />
    </ProtectedRoute>
  )
};
