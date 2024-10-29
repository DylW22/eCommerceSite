import { Navigate, useLocation, useOutletContext } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Outlet } from "react-router-dom";
import { CustomQueryRef } from "../../hooks/useTransactions";
import { GetTransactionsResponse } from "../../types";
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
  const location = useLocation();
  const result = useOutletContext<OutletContextType>();

  const originRoute = location?.state?.from;
  const destinationRoute = formatRouteString(location.pathname);

  const pathData = redirectsConfig[destinationRoute];
  const requireAuth = pathData?.requiresAuth;

  const originRoutes = pathData?.originRoutes;
  const redirectTo = pathData?.redirectTo;

  //If user is not authenticated, but route requires auth, redirect to /login
  if (!isAuthenticated && requireAuth) {
    //console.log("This route requires authorizarion.");
    return (
      <Navigate to="/login" state={{ referrer: destinationRoute }} replace />
    );
  }

  //If route does not requireAuth, redirectTo has been set, but user is already authenticated,
  //redirect to account
  if (!requireAuth && redirectTo) {
    if (isAuthenticated) {
      return <Navigate to="/account" />;
    } else {
      return <>{children}</>;
    }
  }
  if (originRoutes && !originRoutes.includes(originRoute) && redirectTo) {
    return <Navigate to={redirectTo} />;
  }
  return (
    <div
      style={{
        height: "calc(100vh - 82px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Outlet context={{ reference: result.reference }} />
    </div>
  );
}
