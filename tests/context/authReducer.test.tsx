import { authReducer } from "../../src/context/AuthContext";
import { AuthState, AuthAction } from "../../src/types";

describe("authReducer", () => {
  const initialStateLoggedOut: AuthState = {
    isAuthenticated: false,
    token: { accessToken: null, refreshToken: null },
    userData: null,
    error: null,
  };

  const initialStateLoggedIn: AuthState = {
    isAuthenticated: true,
    token: {
      accessToken: "fakeAccessToken",
      refreshToken: "fakeRefreshToken",
    },
    userData: { uid: "1", email: "test@test.com", displayName: "Test User" },
    error: null,
  };

  it("should handle LOGIN action", () => {
    const action: AuthAction = {
      type: "LOGIN",
      userTokens: {
        accessToken: "fakeAccessToken",
        refreshToken: "fakeRefreshToken",
      },
      userData: { uid: "1", email: "test@test.com", displayName: "Test User" },
    };
    const newState = authReducer(initialStateLoggedOut, action);
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.token.accessToken).toBe("fakeAccessToken");
    expect(newState.userData?.email).toBe("test@test.com");
  });
  it("should handle REGISTER action", () => {
    const action: AuthAction = {
      type: "REGISTER",
      userData: {
        uid: "2",
        email: "test2@test.com",
        displayName: "Test User2",
      },
    };

    const newState = authReducer(initialStateLoggedOut, action);
    expect(newState.userData?.email).toBe("test2@test.com");
    expect(newState.userData?.displayName).toBe("Test User2");
  });

  it("should handle LOGOUT action", () => {
    const action: AuthAction = {
      type: "LOGOUT",
    };
    const newState = authReducer(initialStateLoggedIn, action);
    expect(newState.isAuthenticated).toBe(false);
    expect(newState.token.accessToken).toBe(null);
    expect(newState.userData).toBe(null);
  });

  it("should handle SET_ERROR action", () => {
    const action: AuthAction = {
      type: "SET_ERROR",
      error: "testError",
    };
    const newState = authReducer(initialStateLoggedOut, action);
    expect(newState.error).toBe("testError");
    expect(newState.isAuthenticated).toBe(false);
  });

  it("should handle the default state when LoggedOut", () => {
    const action: AuthAction = {
      type: "DEFAULT",
    };
    const newState = authReducer(initialStateLoggedOut, action);
    expect(newState.isAuthenticated).toBe(false);
    expect(newState.error).toBe(null);
  });

  it("should handle the default state when LoggedIn", () => {
    const action: AuthAction = {
      type: "DEFAULT",
    };
    const newState = authReducer(initialStateLoggedIn, action);
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.error).toBe(null);
  });
});
