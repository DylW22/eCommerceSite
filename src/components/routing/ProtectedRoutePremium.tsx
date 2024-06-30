import { Navigate, useLocation, useOutletContext } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Outlet } from "react-router-dom";
import { CustomQueryRef } from "../../hooks/useTransactions";
import { GetTransactionsResponse } from "../../pages/TransactionIndex";
import { redirectsConfig } from "../../data/routingPermissions";
import { formatRouteString } from "../../utilities/formatRouteString";
import { RouteProps } from "../../types";
//import { useShoppingCart } from "../context/ShoppingCartContext";
//stackoverflow.com/questions/69864165/error-privateroute-is-not-a-route-component-all-component-children-of-rou
//Typescript:
///https://blog.logrocket.com/react-children-prop-typescript/

export type OutletContextType = {
  reference: CustomQueryRef<GetTransactionsResponse>;
};

export function ProtectedRoute({ children }: RouteProps) {
  const { state } = useAuth();
  const { isAuthenticated } = state;
  // const { emptyCart } = useShoppingCart();
  const location = useLocation();
  const result = useOutletContext<OutletContextType>();
  let destinationRoute = location.pathname;
  const originRoute = location?.state?.from;

  destinationRoute = formatRouteString(destinationRoute);
  //console.log("destinationRoute: ", destinationRoute);

  const pathData = redirectsConfig[destinationRoute];
  const requireAuth = pathData?.requiresAuth;

  const originRoutes = pathData?.originRoutes;
  const redirectTo = pathData?.redirectTo;

  //If user is not authenticated, but route requires auth, redirect to /login
  if (!isAuthenticated && requireAuth) {
    console.log("Statement 1");
    console.log("I should navigate away: ", destinationRoute);
    return (
      <Navigate to="/login" state={{ referrer: destinationRoute }} replace />
    );
    //If route does not requireAuth, redirectTo has been set, but user is already authenticated,
    //redirect to account
  } else if (!requireAuth && redirectTo && isAuthenticated) {
    //!requireAuth && redirectTo && isAuthenticated
    //   console.log("Statement 2");
    // console.log("I am /login OR /register");
    return <Navigate to="/account" />;
  } else if (!requireAuth && redirectTo && !isAuthenticated) {
    return <>{children}</>;
  } else if (
    originRoutes &&
    !originRoutes.includes(originRoute) &&
    redirectTo
  ) {
    console.log("Statement 3");
    return <Navigate to={redirectTo} />;
  } else {
    return <Outlet context={{ reference: result.reference }} />;
  }
}
