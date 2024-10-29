import React from "react";
import { render, screen, waitFor } from "@testing-library/react";

import { AuthProvider, useAuth } from "../../src/context/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";

import { jest } from "@jest/globals";

jest.mock("firebase/auth");

const MockComponent = () => {
  const { state, login, logout, createAccount } = useAuth();

  React.useEffect(() => {
    // Perform actions like login, logout, createAccount for testing
  }, [login, logout, createAccount]);

  return (
    <div>
      <p data-testid="auth-state">{state.isAuthenticated.toString()}</p>
      <p data-testid="auth-error">{state.error}</p>
    </div>
  );
};

// type MockedUserCredential = UserCredential & {
//   getIdToken: jest.Mock<Promise<string>>;
// };

describe("AuthProvider and useAuth", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should login user successfully", async () => {
    // const mockedUser = {
    //   user: {
    //     uid: "1",
    //     email: "test@test.com",
    //     displayName: "Test User",
    //   },
    //   refreshToken: "testToken",
    //   getIdToken: jest.fn().mockResolvedValue("fakeAccessToken") as any, // Create a mock function that returns a promise
    // };
    // signInWithEmailAndPassword.mockResolvedValue(mockedUser);
    // await render(
    //   <AuthProvider>
    //     <MockComponent />
    //   </AuthProvider>
    // );
    // const authState = screen.getByTestId("auth-state");
    // const authError = screen.getByTestId("auth-error");
    // await waitFor(() => expect(authState.textContent).toBe("true"));
    // expect(authError.textContent).toBe("");
  });
});
