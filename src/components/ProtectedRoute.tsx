import { Navigate, useLocation, useNavigation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Children, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
//stackoverflow.com/questions/69864165/error-privateroute-is-not-a-route-component-all-component-children-of-rou

//Typescript:
///https://blog.logrocket.com/react-children-prop-typescript/
type ProtectedProps = {
  children: ReactNode;
};

export function ProtectedRoute(/*props: ProtectedProps*/) {
  const { state } = useAuth();
  const { isAuthenticated } = state;
  const { emptyCart } = useShoppingCart();
  const location = useLocation();
  //const navigate = useNavigation();
  //return <Navigate to="about" />;

  if (!isAuthenticated) {
    const referrer = location?.pathname; //?.state?.from?.pathname;

    return <Navigate to="/login" state={{ referrer }} replace />;
  }

  if (
    location.pathname === "/payment" &&
    location?.state?.from !== "/checkout"
  ) {
    emptyCart();
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <Outlet />
    </>
  );

  /*
  if (
    location.pathname === "/payment" &&
    location?.state?.from !== "/checkout"
  ) {
    return <Navigate to="/" replace />;
  } else {
    return props.children;
  }*/
}
