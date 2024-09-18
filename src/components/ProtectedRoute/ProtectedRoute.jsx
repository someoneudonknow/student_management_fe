import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuth = true;

  if (!isAuth) {
    return <Navigate to="auth" />;
  }

  return children
};

export default ProtectedRoute;
