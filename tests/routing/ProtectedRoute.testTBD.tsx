import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../../src/components/routing/ProtectedRoute";
import { useAuth } from "../../src/context/AuthContext";
import { useOutletContext } from "react-router-dom";
import React from "react";

jest.mock("../../src/context/AuthContext");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useOutletContext: jest.fn(),
  useLocation: jest.fn(),
}));

describe("Protected route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("redirects to login if route requires auth and user is not authenticated", () => {
    (useAuth as jest.Mock).mockReturnValue({
      state: { isAuthenticated: false },
    });
    jest.spyOn(require("react-router-dom"), "useLocation").mockReturnValue({
      pathname: "/account",
      state: { from: "/" },
    });

    /*const routesConfig = [
            {
              path: "/",
              element: <ProtectedRoute />,
            },
          ];*/

    const { container } = render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route path="/protected" element={<ProtectedRoute />} />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(container.innerHTML).toContain("Login Page");
  });
});
