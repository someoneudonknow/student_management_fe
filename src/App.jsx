import { Navigate, Route, Routes } from "react-router-dom";
import AdminRoutes from "./router/AdminRoutes.jsx";
import AuthRoutes from "./router/AuthRoutes.jsx"
import AppRoot from "./views/Roots/AppRoot.jsx";
import Error from "./views/Error/Error.jsx"
import NotFound from "./views/NotFound/NotFound.jsx";
import ProtectedRoute from "./router/ProtectedRoute.jsx";
import { ADMIN } from "./constants/roles.js";
import useAuthRedirect from "./hooks/useAuthRedirect.js";

function App() {
  useAuthRedirect()

  return (
    <Routes>
      <Route path="/" element={<AppRoot />} errorElement={<Error />}>
        <Route index element={<Navigate to="auth" />} />
        <Route
          path="admin/*"
          element={
            <ProtectedRoute allowedRoles={[ADMIN]}>
              <AdminRoutes />
            </ProtectedRoute>
          }
        />
        <Route path="auth/*" element={<AuthRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App;
