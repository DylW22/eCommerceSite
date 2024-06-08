import { useAuth } from "../context/AuthContext";
import { RoutesConfig } from "../data/routesConfig";

export const useRoutesConfig = () => {
  const appContext = useAuth();

  return RoutesConfig(appContext);
};
