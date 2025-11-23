import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  // console.log("Token in ProtectedRoute:", token);

  if (!token) {
    // Redirect user to login if no token found
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
