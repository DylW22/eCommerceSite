import { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

interface RedirectedRouteProps {
  children: ReactNode;
}

export function RedirectedRoute({ children }: RedirectedRouteProps) {
  const { state } = useAuth();
  const { isAuthenticated } = state;

  return isAuthenticated ? <Navigate to="/account" /> : <>{children}</>;
}
