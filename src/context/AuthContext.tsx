import React, { Children, createContext, useContext, useReducer } from "react";
import { ReactNode } from "react";
type AuthCartProviderProps = {
  children: ReactNode;
};

type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
};

type AuthAction = { type: "LOGIN"; token: string } | { type: "LOGOUT" };

type AuthContextType = {
  state: AuthState;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN": {
      return { ...state, isAuthenticated: true, token: action.token };
    }
    case "LOGOUT": {
      return { ...state, isAuthenticated: false, token: null };
    }
  }
};

const AuthProvider = ({ children }: AuthCartProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    token: null,
  });

  const login = (token: string) => dispatch({ type: "LOGIN", token });
  const logout = () => dispatch({ type: "LOGOUT" });

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
