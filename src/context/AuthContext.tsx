import { createContext, useContext, useEffect, useReducer } from "react";
import { ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
//import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../utilities/firebaseConfig.js";
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
      return {
        ...state,
        isAuthenticated: false,
        token: null,
      };
    }
    default:
      return state;
  }
};

const AuthProvider = ({ children }: AuthCartProviderProps) => {
  const [persistedState, setPersistedState] = useLocalStorage<AuthState>(
    "authState",
    {
      isAuthenticated: false,
      token: "null",
    }
  );
  const [state, dispatch] = useReducer(authReducer, persistedState);
  //const navigate = useNavigate();
  //const location = useLocation();

  useEffect(() => {
    setPersistedState(state);
    console.log("Current state: ", state);
  }, [state, persistedState]);

  const login = async (token: string, username: string, password: string) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );
      const userData = {
        uid: userCredentials.user.uid,
        email: userCredentials.user.email,
        displayName: userCredentials.user.displayName,
      };
      const userTokens = {
        accessToken: userCredentials.user.stsTokenManager.accessToken,
        refreshToken: userCredentials.user.stsTokenManager.refreshToken,
      };

      console.log("userData: ", userData);
      console.log("userTokens: ", userTokens);
    } catch (error) {
      //Error signing in
    }

    dispatch({ type: "LOGIN", token });
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      //Error signing out
    }
    dispatch({ type: "LOGOUT" });
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
