import { Outlet } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import { ShoppingCartProvider } from "./ShoppingCartContext";
import { ThemeProvider } from "./ThemeContext";

export const AuthLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export const ShoppingCartProviderLayout = () => {
  return (
    <ShoppingCartProvider>
      <Outlet />
    </ShoppingCartProvider>
  );
};

export const ThemeProviderLayout = () => {
  return (
    <ThemeProvider>
      <Outlet />
    </ThemeProvider>
  );
};
