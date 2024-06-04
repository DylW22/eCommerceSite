import { createContext, useContext, useEffect, useReducer } from "react";
import { ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
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
  const [persistedState, setPersistedState] = useLocalStorage<AuthState>(
    "authState",
    {
      isAuthenticated: false,
      token: null,
    }
  );
  const [state, dispatch] = useReducer(authReducer, persistedState);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setPersistedState(state);
  }, [state, persistedState]);

  const login = (token: string) => {
    dispatch({ type: "LOGIN", token });
    console.log("AuthContext: ", location?.state?.from);
    navigate("/account", { state: { from: location } });
  };
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/", { state: { from: location } });
  };

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