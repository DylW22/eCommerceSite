import { useAuth } from "../context/AuthContext";
import { RoutesConfig } from "../data/RoutesConfig";
export const useRoutesConfig = () => {
  const appContext = useAuth();
  return RoutesConfig(appContext);
};
