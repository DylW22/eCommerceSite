import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { AuthProvider, useAuth } from "../../src/context/AuthContext";
import React, { act } from "react";
import { renderHook } from "@testing-library/react";

jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn(), //solves:  auth_1.signInWithEmailAndPassword.mockResolvedValueOnce is not a function
  getAuth: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
}));

describe("Login function", () => {
  test("should login successfully", async () => {
    const mockUser = {
      uid: "123",
      email: "test@example.com",
      displayName: "Test User",
      getIdToken: jest.fn(),
      refreshToken: "mockRefreshToken",
    };

    const mockUserCredentials = {
      user: mockUser,
    };

    (signInWithEmailAndPassword as any).mockResolvedValueOnce(
      mockUserCredentials
    );
    const wrapper = ({ children }: { children?: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    const { login } = result.current;
    await act(async () => {
      await login("test@example.com", "password");
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        undefined,
        "test@example.com",
        "password"
      );
    });
  });

  test("should reject invalid email address", async () => {
    const wrapper = ({ children }: { children?: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });
    await act(async () => {
      await expect(result.current.login("  ", "password")).rejects.toThrow(
        "Username and password are required."
      );
    });

    expect(signInWithEmailAndPassword).not.toHaveBeenCalled();
  });
  test("should reject invalid password", async () => {
    const wrapper = ({ children }: { children?: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });
    await act(async () => {
      await expect(
        result.current.login("test@example.com", " ")
      ).rejects.toThrow("Username and password are required.");
    });

    expect(signInWithEmailAndPassword).not.toHaveBeenCalled();
  });
});

describe("createAccount function", () => {
  test("should createAccount successfully", async () => {
    const mockUser = {
      uid: "123",
      email: "test@example.com",
      displayName: "Test User",
      getIdToken: jest.fn(),
      refreshToken: "mockRefreshToken",
    };

    const mockUserCredentials = {
      user: mockUser,
    };

    (createUserWithEmailAndPassword as any).mockResolvedValueOnce(
      mockUserCredentials
    );
    const wrapper = ({ children }: { children?: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    const { createAccount } = result.current;
    await act(async () => {
      await createAccount("test@example.com", "password");
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        undefined,
        "test@example.com",
        "password"
      );
    });
  });

  test("should reject invalid email address", async () => {
    const wrapper = ({ children }: { children?: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });
    await act(async () => {
      await expect(
        result.current.createAccount("  ", "password")
      ).rejects.toThrow("Username and password are required.");
    });

    expect(createUserWithEmailAndPassword).not.toHaveBeenCalled();
  });
  test("should reject invalid password", async () => {
    const wrapper = ({ children }: { children?: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });
    await act(async () => {
      await expect(
        result.current.createAccount("test@example.com", " ")
      ).rejects.toThrow("Username and password are required.");
    });

    expect(createUserWithEmailAndPassword).not.toHaveBeenCalled();
  });
});
