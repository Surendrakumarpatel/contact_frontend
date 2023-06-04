import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
   if (!token) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  
  return children;
};

export default ProtectedRoute