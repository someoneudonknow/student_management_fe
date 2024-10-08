import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserProvider/UserProvider.jsx";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { data } = useUser()

  if (!data?.user) {
    return <Navigate to="/auth" />;
  }

  if (allowedRoles && !allowedRoles.includes(data.user?.role)) {
    return <Navigate to="/auth" />;
  }

  return children
};

export default ProtectedRoute;
