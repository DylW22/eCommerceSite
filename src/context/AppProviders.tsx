import React from "react";
import { AuthProvider } from "./AuthContext"; // Adjust the import path as needed
import { ShoppingCartProvider } from "./ShoppingCartContext"; // Adjust the import path as needed
import { ThemeProvider } from "./ThemeContext"; // Adjust the import path as needed

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <ShoppingCartProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </ShoppingCartProvider>
    </AuthProvider>
  );
};

export default AppProviders;
