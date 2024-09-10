import { createContext, useContext, useEffect, useReducer } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
//import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  UserCredential,
  AuthError,
} from "firebase/auth";
import { auth } from "../utilities/firebaseConfig.ts";
import {
  AuthCartProviderProps,
  AuthState,
  AuthAction,
  AuthContextType,
} from "../types.ts";
import getErrorMessage from "../utilities/getErrorMessage.ts";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const authReducer = (state: AuthState, action: AuthAction) => {
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
    case "SUBSCRIBE_NEWSLETTER": {
      return {
        ...state,
        newsletterSubscribed: true,
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
      newsletterSubscribed: false,
    }
  );
  const [state, dispatch] = useReducer(authReducer, persistedState);

  useEffect(() => {
    setPersistedState(state);
  }, [state, persistedState]);

  const login = async (
    username: string,
    password: string
    // authFirebase: any = auth
  ) => {
    try {
      if (!username.trim() || !password.trim()) {
        throw new Error("Username and password are required.");
      }

      const userCredentials: UserCredential = await signInWithEmailAndPassword(
        //authFirebase,
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
      //console.log("AuthContext login: ", userCredentials);
      //  console.log("TOKEN: ", token);
      dispatch({ type: "LOGIN", userData, userTokens });
      return userData;
    } catch (error: unknown) {
      //console.log("An error occurred: ", error);
      const firebaseError = error as AuthError;
      const errorCode = firebaseError.code;

      console.log("ErrorCode: ", errorCode);
      if (error instanceof Error) {
        //console.log("error.message: ", error);
        const errorToSet = getErrorMessage(errorCode);
        dispatch({ type: "SET_ERROR", error: errorToSet });
      } else {
        dispatch({
          type: "SET_ERROR",
          error: "An unknown error occurred when logging in.",
        });
      }
      throw error;
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
      if (!email.trim() || !password.trim()) {
        throw new Error("Username and password are required.");
      }
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
      console.log("error creating account: ", error);
      if (error instanceof Error) {
        dispatch({ type: "SET_ERROR", error: error.message });
      } else {
        dispatch({
          type: "SET_ERROR",
          error: "An unknown error occurred when creating your account.",
        });
      }
      throw error;
    }
  };
  const subscribeToNewsletter = () => {
    dispatch({ type: "SUBSCRIBE_NEWSLETTER" });
  };
  return (
    <AuthContext.Provider
      value={{ state, login, logout, createAccount, subscribeToNewsletter }}
    >
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
