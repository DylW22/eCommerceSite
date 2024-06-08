import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
export function RedirectedRoute({ children }) {
  const { state } = useAuth();
  const { isAuthenticated } = state;

  return isAuthenticated ? <Navigate to="/account" /> : <>{children}</>;
}
