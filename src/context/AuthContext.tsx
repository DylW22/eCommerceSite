import { createContext, useContext, useEffect, useReducer } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
//import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { auth } from "../utilities/firebaseConfig.ts";
import {
  AuthCartProviderProps,
  AuthState,
  AuthAction,
  AuthContextType,
} from "../types.ts";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        ...state,
        isAuthenticated: true,
        token: action.userTokens,
        userData: action.userData,
        error: null,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        isAuthenticated: false,
        token: { accessToken: null, refreshToken: null },
        userData: null,
        error: null,
      };
    }
    case "REGISTER": {
      //Update state
      return {
        ...state,
        isAuthenticated: true,
        userData: action.userData,
        error: null,
      };
    }
    case "SET_ERROR": {
      return {
        ...state,
        error: action.error,
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
      token: {
        accessToken: null,
        refreshToken: null,
      },
      userData: null,
      error: null,
    }
  );
  const [state, dispatch] = useReducer(authReducer, persistedState);

  useEffect(() => {
    setPersistedState(state);
  }, [state, persistedState]);

  const login = async (username: string, password: string) => {
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
      //  console.log("TOKEN: ", token);
      dispatch({ type: "LOGIN", userData, userTokens });
      return userData;
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch({ type: "SET_ERROR", error: error.message });
      } else {
        dispatch({
          type: "SET_ERROR",
          error: "An unknown error occurred when logging in.",
        });
      }

      //Error signing in
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error: unknown) {
      //Error signing out
      if (error instanceof Error) {
        dispatch({ type: "SET_ERROR", error: error.message });
      } else {
        dispatch({
          type: "SET_ERROR",
          error: "An unknown error occurred when signing out.",
        });
      }
    }
    dispatch({ type: "LOGOUT" });
  };

  const createAccount = async (email: string, password: string) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
        //"testuser2@gmail.com",
        //"ABCDEF123"
      );
      const userData = {
        uid: userCredentials.user.uid,
        email: userCredentials.user.email,
        displayName: userCredentials.user.displayName,
      };
      //console.log("createAccount details: ", userData);
      dispatch({ type: "REGISTER", userData });
    } catch (error: unknown) {
      //Error creating account
      if (error instanceof Error) {
        dispatch({ type: "SET_ERROR", error: error.message });
      } else {
        dispatch({
          type: "SET_ERROR",
          error: "An unknown error occurred when creating your account.",
        });
      }
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

export { AuthProvider, useAuth, AuthContext };
