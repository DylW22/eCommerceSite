import { createContext, useContext, useEffect, useReducer } from "react";
import { ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
//import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { auth } from "../utilities/firebaseConfig.ts";
type AuthCartProviderProps = {
  children: ReactNode;
};

interface UserData {
  uid: string | null;
  email: string | null;
  displayName: string | null;
}

interface Tokens {
  accessToken: string | null;
  refreshToken: string | null;
}

type AuthState = {
  isAuthenticated: boolean;
  token: Tokens;
  userData: UserData | null;
};

type AuthAction =
  | { type: "LOGIN"; token: string; userData: UserData; userTokens: Tokens }
  | { type: "LOGOUT" }
  | { type: "REGISTER"; userData: UserData };

export type AuthContextType = {
  state: AuthState;
  login: (token: string, username: string, password: string) => void;
  logout: () => void;
  createAccount: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        ...state,
        isAuthenticated: true,
        token: action.userTokens,
        userData: action.userData,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        isAuthenticated: false,
        token: { accessToken: null, refreshToken: null },
        userData: null,
      };
    }
    case "REGISTER": {
      //Update state
      return { ...state, isAuthenticated: true, userData: action.userData };
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
      token: {
        accessToken: null,
        refreshToken: null,
      },
      userData: null,
    }
  );
  const [state, dispatch] = useReducer(authReducer, persistedState);

  useEffect(() => {
    setPersistedState(state);
  }, [state, persistedState]);

  const login = async (token: string, username: string, password: string) => {
    try {
      const userCredentials: UserCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );
      const user = userCredentials.user;

      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };

      const userTokens = {
        accessToken: await user.getIdToken(),
        refreshToken: user.refreshToken,
      };
      //console.log("User tokens: ", userTokens);

      dispatch({ type: "LOGIN", token, userData, userTokens });
    } catch (error) {
      //Error signing in
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      //Error signing out
    }
    dispatch({ type: "LOGOUT" });
  };

  const createAccount = async () => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        "testuser2@gmail.com",
        "ABCDEF123"
      );
      const userData = {
        uid: userCredentials.user.uid,
        email: userCredentials.user.email,
        displayName: userCredentials.user.displayName,
      };
      //console.log("createAccount details: ", userData);
      dispatch({ type: "REGISTER", userData });
    } catch (error) {
      //Error creating account
    }
  };

  return (
    <AuthContext.Provider value={{ state, login, logout, createAccount }}>
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
