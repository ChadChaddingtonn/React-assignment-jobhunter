import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../state/authSlice";
import { Navigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const ProtectedRoute = ({ children, redirectTo }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ redirected: true }} />;
  }

  return children;
};

export default ProtectedRoute;
