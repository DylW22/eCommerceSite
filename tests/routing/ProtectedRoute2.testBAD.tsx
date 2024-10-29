import { render, screen } from "@testing-library/react";
import { MemoryRouter, Outlet, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../../src/components/routing/ProtectedRoute";
import { useAuth } from "../../src/context/AuthContext";
import { useOutletContext } from "react-router-dom";
import React from "react";
import { auth } from "../../src/utilities/firebaseConfig";
import "@testing-library/jest-dom/";
jest.mock("../../src/utilities/firebaseConfig", () => ({
  firebaseApp: jest.fn(),
  auth: {
    currentUser: { uid: "mock-user-id", email: "test@example.com" },
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
  },
  database: jest.fn(),
}));

jest.mock("../../src/context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

/*
jest.mock("../../src/context/AuthContext");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useOutletContext: jest.fn(),
  useLocation: jest.fn(),
}));
*/
describe("Protected route", () => {
  it("redirects to login if the user is not authenticated and route requires auth", () => {
    (useAuth as jest.Mock).mockReturnValue({
      state: { isAuthenticated: false }, // Simulate not authenticated
    });

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
          <Route
            path="/"
            element={
              <div>
                <Outlet
                  context={{ reference: { result: { reference: "/account" } } }}
                />{" "}
                {/* Mock Outlet context */}
              </div>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    // Assert that the user is redirected to the login page
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });
  /* test("redirects to login if route requires auth and user is not authenticated", () => {
    (useAuth as jest.Mock).mockReturnValue({
      state: { isAuthenticated: false },
    });
    jest.spyOn(require("react-router-dom"), "useLocation").mockReturnValue({
      pathname: "/account",
      state: { from: "/" },
    });*/
  /*const routesConfig = [
            {
              path: "/",
              element: <ProtectedRoute />,
            },
          ];*/
  /* const { container } = render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route path="/protected" element={<ProtectedRoute />} />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(container.innerHTML).toContain("Login Page");
  });*/
});
