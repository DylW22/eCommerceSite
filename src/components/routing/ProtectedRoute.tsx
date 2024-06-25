import { Navigate, useLocation, useOutletContext } from "react-router-dom";
//import { useAuth } from "../context/AuthContext";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { CustomQueryRef } from "../../hooks/useTransactions";
import { GetTransactionsResponse } from "../../pages/TransactionIndex";
//import { useShoppingCart } from "../context/ShoppingCartContext";
//stackoverflow.com/questions/69864165/error-privateroute-is-not-a-route-component-all-component-children-of-rou
//Typescript:
///https://blog.logrocket.com/react-children-prop-typescript/

export type OutletContextType = {
  reference: CustomQueryRef<GetTransactionsResponse>;
};

export function ProtectedRoute() {
  const { state } = useAuth();
  const { isAuthenticated } = state;
  const { emptyCart } = useShoppingCart();
  const location = useLocation();
  const nav = useNavigate();
  const result = useOutletContext<OutletContextType>();
  //const { reference: result } = reference;
  // console.log("result context: ", result.reference);
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

  return <Outlet context={{ reference: result.reference }} />;
}
