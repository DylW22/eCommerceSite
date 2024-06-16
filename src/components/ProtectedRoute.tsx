import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
//stackoverflow.com/questions/69864165/error-privateroute-is-not-a-route-component-all-component-children-of-rou
//Typescript:
///https://blog.logrocket.com/react-children-prop-typescript/

export function ProtectedRoute(/*props: ProtectedProps*/) {
  const { state } = useAuth();
  const { isAuthenticated } = state;
  const { emptyCart } = useShoppingCart();
  const location = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    if (
      location.pathname === "/payment" &&
      location?.state?.from !== "/checkout"
    ) {
      emptyCart();
      nav("/");
    }
  }, [location, emptyCart, nav]);

  if (!isAuthenticated) {
    const referrer = location?.pathname;
    return <Navigate to="/login" state={{ referrer }} replace />;
  }

  return <Outlet />;
}
