import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { RouteProps } from "../../types";
//import { useLocation } from "react-router-dom";
export function RedirectedRoute({ children }: RouteProps) {
  const { state } = useAuth();
  const { isAuthenticated } = state;
  console.log("Using RedirectedRoute");
  return isAuthenticated ? <Navigate to="/account" /> : <>{children}</>;
}
