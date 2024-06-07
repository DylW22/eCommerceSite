import { useAuth } from "../context/AuthContext";
import { routesConfig } from "../data/routesConfig";
export const useRoutesConfig = () => {
  const appContext = useAuth();
  return routesConfig(appContext);
};
