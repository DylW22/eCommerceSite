import { Navigate, useLocation, useOutletContext } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Outlet } from "react-router-dom";
import { CustomQueryRef } from "../../hooks/useTransactions";
import { GetTransactionsResponse } from "../../pages/TransactionIndex";
import { redirectsConfig } from "../../data/routingPermissions";
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
  // const { emptyCart } = useShoppingCart();
  const location = useLocation();
  const result = useOutletContext<OutletContextType>();
  const destinationRoute = location.pathname;
  const originRoute = location?.state?.from;

  if (!isAuthenticated) {
    const referrer = location?.pathname; //
    return <Navigate to="/login" state={{ referrer }} replace />;
  }

  //Need to differentiate between navigating directly to /payment from a route besides /checkout
  //and from clicking submit on the CONFIRM button

  //OG:
  /*
  if (
    destinationRoute === "/payment" && //location.pathname
    originRoute !== "/checkout" && //location?.state?.from
    originRoute !== "/payment" //location?.state?.from
  ) {
    return <Navigate to="/" />;
  }

  //Cannot directly access /success, need to visit /payment first
  if (
    destinationRoute === "/success" && //location.pathname
    originRoute !== "/payment" //location?.state?.from
  ) {
    return <Navigate to="/" />;
  }
  */

  const pathData = redirectsConfig[destinationRoute];
  const originRoutes = pathData?.originRoutes;
  const redirectTo = pathData?.redirectTo;
  if (originRoutes && !originRoutes.includes(originRoute)) {
    return <Navigate to={redirectTo} />;
  }

  return <Outlet context={{ reference: result.reference }} />;
}
