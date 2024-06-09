import { useAuth } from "../context/AuthContext";
import { RoutesConfig } from "../data/routesConfig";
import { RouteObject } from "react-router-dom";
export const useRoutesConfig = (): RouteObject[] => {
  const appContext = useAuth();

  return RoutesConfig(appContext);
};
