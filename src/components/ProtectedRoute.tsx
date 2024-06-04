import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ReactNode, useEffect } from "react";

//stackoverflow.com/questions/69864165/error-privateroute-is-not-a-route-component-all-component-children-of-rou

//Typescript:
///https://blog.logrocket.com/react-children-prop-typescript/
type ProtectedProps = {
  children: ReactNode;
};

export function ProtectedRoute(props: ProtectedProps) {
  const { state } = useAuth();
  const { isAuthenticated } = state;
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return props.children;
}
