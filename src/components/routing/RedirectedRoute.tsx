import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { RouteProps } from "../../types";

export function RedirectedRoute({ children }: RouteProps) {
  const { state } = useAuth();
  const { isAuthenticated } = state;

  return isAuthenticated ? <Navigate to="/account" /> : <>{children}</>;
}
